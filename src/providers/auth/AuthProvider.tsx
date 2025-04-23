import { onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  isUserFetching: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => Promise.resolve(undefined),
  login: () => Promise.resolve({} as User),
  logout: () => Promise.resolve(undefined),
  isUserFetching: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserFetching, setIsUserFetching] = useState(true);
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw new Error("Credenciais inválidas: " + (error as Error).message);
    }
  };

  const logout = () => auth.signOut();

  const setUserCallback = useCallback(
    async (user: User | null) => setUser(user),
    [setUser]
  );

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserCallback(user?.uid ? user : null);
        setIsUserFetching(false);
      });
      return () => unsubscribe();
    }
  }, [auth, setUserCallback]);

  return (
    <AuthContext.Provider
      value={{
        user: memoizedUser,
        setUser: setUserCallback,
        login,
        logout,
        isUserFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
