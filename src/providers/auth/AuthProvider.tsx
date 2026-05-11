/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useCallback, useEffect, useState } from "react";
import { AuthContextType } from "./types";
import { getEntity } from "../../services/getEntity";
import { Tenant } from "../../types/models";
import { redirectToSubdomain } from "../utils";
import { backendEndpoint } from "../../services/utils";

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

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      throw new Error("Credenciais inválidas: " + (error as Error).message);
    }
  };

  const logout = () => auth.signOut();

  const getTenantFromUserClaims = useCallback(async (userParam: User) => {
    const tokenResult = await userParam.getIdTokenResult();
    const tenantId = (tokenResult.claims.tenant_id as string) ?? null;

    if (!tenantId) return;

    const currentSubdomain = window.location.hostname.split(".")[0];
    const fetchedTenant = await getEntity<Tenant>({
      user: userParam,
      resource: "tenants",
      id: parseInt(tenantId),
    });

    if (fetchedTenant.subdomain !== currentSubdomain) {
      const idToken = await userParam.getIdToken();
      const { customToken } = await fetch(
        `${backendEndpoint}auth/custom-token`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
        },
      ).then((r) => r.json());

      redirectToSubdomain({
        subdomain: fetchedTenant.subdomain,
        token: customToken,
      });
    }
  }, []);

  const setUserCallback = useCallback(async (user: User | null) => {
    setUser(user);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      window.history.replaceState({}, "", "/dashboard");

      signInWithCustomToken(auth, token)
        .then((credential) => {
          // sessão já é a correta — seta direto, sem verificar tenant
          setUser(credential.user);
          setIsUserFetching(false);
        })
        .catch((error) => {
          console.error(error);
          setIsUserFetching(false);
        });

      // retorna aqui — NÃO registra o onAuthStateChanged nesse branch
      return;
    }

    // fluxo normal: sem token
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setIsUserFetching(false);

      if (firebaseUser) getTenantFromUserClaims(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
