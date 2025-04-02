import { User } from "firebase/auth";
import { AppointmentFormData } from "../types/formData";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
const resource = "appointments";

export const createAppointment = async (user: User, payload: AppointmentFormData) => {
  await fetch(`${backendEndpoint}${resource}/create/`, {
    method: "post",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
};
