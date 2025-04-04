import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Appointment, Client, Professional, Service } from "../../types/models";
import { LoadingContext } from "../loading/LoadingProvider";
import { parseAppointments, parseServices } from "./utils";

export type CacheType = {
  clients: Client[];
  professionals: Professional[];
  services: Service[];
  appointments: Appointment[];
};

type FetcherResponse = {
  cache: CacheType;
  fetchResource: (resource: keyof CacheType) => Promise<void>;
  fetchAll: () => Promise<void>;
};

const defaultContext = {
  cache: {
    clients: [],
    professionals: [],
    services: [],
    appointments: [],
  },
  fetchResource: () => Promise.resolve(undefined),
  fetchAll: () => Promise.resolve(undefined),
};
const FetcherContext = createContext<FetcherResponse>(defaultContext);

const FetcherProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  // const [cache, setCache] = useState<CacheType>(defaultContext.cache);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const { setIsLoadingCallback } = useContext(LoadingContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

  const fetchResource = useCallback(
    async <T,>(resource: keyof CacheType): Promise<void> => {
      try {
        const response = await fetch(`${endpoint}${resource}/`, {
          headers: {
            credentials: "include",
            Authorization: (await user?.getIdToken()) || "",
            "Content-Type": "application/json",
          },
        });

        const data = (await response.json()) as T;

        switch (resource) {
          case "appointments":
            setAppointments(parseAppointments(data as Appointment[]));
            break;
          case "services":
            setServices(parseServices(data as Service[]));
            break;
          case "professionals":
            setProfessionals(data as Professional[]);
            break;
          case "clients":
            setClients(data as Client[]);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(
          `Fetcher: error fetching ${resource}:`,
          (error as Error).message
        );
        throw error;
      }
    },
    [endpoint, user]
  );

  const fetchAll = useCallback(async () => {
    await fetchResource<Appointment[]>("appointments");
    await fetchResource<Service[]>("services");
    await fetchResource<Professional[]>("professionals");
    await fetchResource<Client[]>("clients");
  }, [fetchResource]);

  const setIsDataFetchedCallback = useCallback(
    (isFetched: boolean) => setIsDataFetched(isFetched),
    [setIsDataFetched]
  );

  useEffect(() => {
    const loadInitialData = async () => {
      if (user && !isDataFetched) {
        setIsLoadingCallback(true);

        await fetchAll();
        setIsDataFetchedCallback(true);

        setIsLoadingCallback(false);
      }
    }; //ver carregamentos

    loadInitialData();
  }, [
    user,
    setIsDataFetchedCallback,
    isDataFetched,
    fetchAll,
    setIsLoadingCallback,
  ]);

  const cache = {
    services,
    appointments,
    professionals,
    clients,
  };

  return (
    <FetcherContext.Provider value={{ cache, fetchAll, fetchResource }}>
      {children}
    </FetcherContext.Provider>
  );
};

export { FetcherProvider, FetcherContext };
