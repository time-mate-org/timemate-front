import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingContext } from "../loading/LoadingProvider";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setIsLoadingCallback } = useContext(LoadingContext);

  const setUserCallback = useCallback(
    async (user: User | null) => setUser(user),
    [setUser]
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserCallback(user?.uid ? user : null);
      setIsLoadingCallback(false);
    });
    return () => unsubscribe();
  }, [setIsLoadingCallback, setUserCallback]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
