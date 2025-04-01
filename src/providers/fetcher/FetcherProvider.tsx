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

type FetcherResponse = {
  clients: Client[];
  professionals: Professional[];
  services: Service[];
  appointments: Appointment[];
};

const defaultContext = {
  clients: [],
  professionals: [],
  services: [],
  appointments: [],
};
const FetcherContext = createContext<FetcherResponse>(defaultContext);

const FetcherProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [cache, setCache] = useState<FetcherResponse>(defaultContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

  const fetchResource = useCallback(
    async <T,>(resource: keyof FetcherResponse): Promise<T> => {
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
        await fetchAll();
        setIsDataFetchedCallback(true);
      }
    };

    loadInitialData();
  }, [user, setIsDataFetchedCallback, isDataFetched, fetchAll]);

  return (
    <FetcherContext.Provider value={cache}>{children}</FetcherContext.Provider>
  );
};

export { FetcherProvider, FetcherContext };
