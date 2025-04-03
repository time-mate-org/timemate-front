import { User } from "firebase/auth";
import { ClientFormData } from "../types/formData";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
const resource = "clients";

export const createClient = async (
  user: User,
  payload: ClientFormData
) => {
  const result = await fetch(`${backendEndpoint}${resource}/create/`, {
    method: "post",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (result.status !== 201)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
