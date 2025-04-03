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
  const [cache, setCache] = useState<CacheType>(defaultContext.cache);
  const { setIsLoadingCallback } = useContext(LoadingContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

  const fetchResource = useCallback(
    async <T,>(resource: keyof CacheType): Promise<T> => {
      try {
        const response = await fetch(`${endpoint}${resource}/`, {
          headers: {
            credentials: "include",
            Authorization: (await user?.getIdToken()) || "",
            "Content-Type": "application/json",
          },
        });

        const data = (await response.json()) as T;

        return data;
      } catch (error) {
        console.error(
          `Fetcher: error fetching ${resource}:`,
          (error as Error).message
        );
        throw error;
      }
    },
    [user, endpoint]
  );

  const fetchAll = useCallback(async () => {
    const appointments = (
      await fetchResource<Appointment[]>("appointments")
    ).map<Appointment>((appointment) => ({
      ...appointment,
      startTime: new Date(appointment.start_time),
      endTime: new Date(appointment.end_time),
    }));
    const services = (await fetchResource<Service[]>("services")).map<Service>(
      (service) => ({
        ...service,
        estimatedTime: service.estimated_time,
      })
    );
    const professionals = await fetchResource<Professional[]>("professionals");
    const clients = await fetchResource<Client[]>("clients");

    setCache({
      appointments,
      services,
      professionals,
      clients,
    });
  }, [fetchResource, setCache]);

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

  return (
    <FetcherContext.Provider value={{ cache, fetchAll, fetchResource }}>
      {children}
    </FetcherContext.Provider>
  );
};

export { FetcherProvider, FetcherContext };
