import { ParsedToken, User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  isUserFetching: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export type Token = ParsedToken & { tenant_id: string };
