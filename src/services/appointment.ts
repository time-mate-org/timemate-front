import { User } from "firebase/auth";
import { AppointmentFormData } from "../types/formData";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
const resource = "appointments";

export const createAppointment = async (
  user: User,
  payload: AppointmentFormData
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

  if (result.status === 409)
    throw new Error(`ou cliente ou profissional já esta agendado nesse período.`);
  if (result.status !== 201)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
