import { createContext, useCallback, useState } from "react";
interface LoadingContext {
  isLoading: boolean;
  setIsLoadingCallback: (newIsLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContext>({
  isLoading: false,
  setIsLoadingCallback: () => undefined,
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const setIsLoadingCallback = useCallback(
    (newIsLoading: boolean) => setIsLoading(newIsLoading),
    []
  );

  return (
    <LoadingContext.Provider value={{ setIsLoadingCallback, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export { LoadingProvider, LoadingContext };
