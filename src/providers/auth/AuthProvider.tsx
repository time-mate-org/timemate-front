import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../../services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

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

  const setUserCallback = useCallback(
    async (user: User | null) => setUser(user),
    [setUser]
  );

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        setUserCallback(user?.uid ? user : null);
      });
    }
  }, [setUserCallback]);

  return (
    <AuthContext.Provider
      value={{
        user: memoizedUser,
        setUser: setUserCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
