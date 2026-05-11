import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import { Tenant } from "../../types/models";
import { getTenantBySubdomain } from "../../services/getEntity";

type TenantContextType = {
  tenant: Tenant | undefined;
  tenantQuery?: UseQueryResult<Tenant, Error>;
};

const defaultTenantContext = {
  tenant: undefined,
  tenantQuery: undefined,
};

const TenantContext = createContext<TenantContextType>(defaultTenantContext);

const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const subdomain = window.location.hostname.split(".")[0];

  const tenantQuery = useQuery({
    queryKey: ["tenant", subdomain],
    enabled: !!subdomain,
    queryFn: () => getTenantBySubdomain(subdomain),
    staleTime: Infinity, // ← não refaz a query enquanto a página não recarregar
  });

  useEffect(() => {
    if (tenantQuery.data) {
      document.title = `${tenantQuery.data.name} - Timemate agendamentos`;
    }
  }, [tenantQuery.data]);

  return (
    <TenantContext.Provider value={{ tenant: tenantQuery.data, tenantQuery }}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantProvider, TenantContext };
