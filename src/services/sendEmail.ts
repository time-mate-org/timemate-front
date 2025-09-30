import { EmailPayloadType } from "./types";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

export const sendEmail = async (payload: EmailPayloadType) => {
  const result = await fetch(`${backendEndpoint}send-mail/`, {
    method: "post",
    headers: {
      credentials: "include",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
