import { User } from "firebase/auth";
import { CacheType } from "../fetcher/FetcherProvider";

export type GetCancelDialogParamType = {
  user: User;
  resource: keyof CacheType;
  id: number;
  callback: () => void;
};

export const translateResource = (resource: keyof CacheType): string => {
  switch (resource) {
    case "appointments":
      return "agendamento";
    case "services":
      return "serviço";
    case "clients":
      return "cliente";
    case "professionals":
      return "profissional";
    default:
      return "";
  }
};