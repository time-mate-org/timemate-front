import { create } from "zustand";
import { signOut as firebaseSignOut, getAuth, User } from "firebase/auth";
import { signIn } from "./firebase";
import { createJSONStorage, persist } from "zustand/middleware";

// Define o tipo do estado global
export type AuthState = {
  user: string | null; // email
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => Promise<void>;
  setUser: (user?: User) => Promise<void>;
  setError: (error?: string) => Promise<void>;
};

// Cria o store de autenticação
export const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      user: null,
      loading: false,
      error: null,

      // Função de login
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signIn(email, password);
          set({ user: userCredential.email, loading: false });
        } catch {
          set({
            error: `Credenciais inválidas.`,
            loading: false,
          });
        }
      },

      // Função de logout
      logout: async () => {
        set({ loading: true });
        try {
          await firebaseSignOut(getAuth());
          set({ user: null, loading: false, error: null });
        } catch (err) {
          set({
            error: `Erro ao fazer logout: ${(err as Error).message}`,
            loading: false,
          });
        }
      },

      setLoading: async (isLoading: boolean) => {
        set({ loading: isLoading });
      },

      setUser: async (user?: User) => {
        set({ user: user?.email });
      },

      setError: async (error?: string) => {
        set({ error });
      },
    }),
    {
      name: "timemate-storage", // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // Pode ser sessionStorage ou outro storage
    }
  )
);
