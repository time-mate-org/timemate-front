import { useQuery } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => Promise.resolve(undefined),
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: auth } = useQuery({
    enabled: !!user,
    queryKey: ["firebase"],
    queryFn: () => getAuth(),
  });

  const setUserCallback = useCallback(
    async (user: User | null) => setUser(user),
    [setUser]
  );

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserCallback(user?.uid ? user : null);
      });
      return () => unsubscribe();
    }
  }, [auth, setUserCallback]);

  return (
    <AuthContext.Provider
      value={{ user: memoizedUser, setUser: setUserCallback }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
