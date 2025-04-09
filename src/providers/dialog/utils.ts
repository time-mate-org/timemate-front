import { User } from "firebase/auth";

export type GetCancelDialogParamType = {
  user: User;
  resource: string;
  id: number;
  callback: () => void;
};

export const translateResource = (resource: string): string => {
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