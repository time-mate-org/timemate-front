import { backendEndpoint } from "./utils";
import { GetEntityParamType } from "./types";
import { Service, Tenant } from "../types/models";

export const getEntity = async <T extends object>({
  user,
  resource,
  id,
}: GetEntityParamType): Promise<T> => {
  const result = await fetch(`${backendEndpoint}${resource}/${id ? id : ""}`, {
    method: "get",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
  });
  const parsed = await result.json();

  if (result.status !== 200) {
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
  }

  const entities = parsed as T;
  return entities;
};

export const getTenantBySubdomain = async (subDomain: string) => {
  const result = await fetch(
    `${backendEndpoint}tenants/subdomain/${subDomain}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);

  const tenant = (await result.json()) as Tenant;
  return tenant;
};

export const getServices = async (tenantId: number) => {
  const result = await fetch(`${backendEndpoint}services/tenant/${tenantId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);

  const services = (await result.json()) as Service[];
  return services;
};
