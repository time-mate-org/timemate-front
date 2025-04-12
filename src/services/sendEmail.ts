import { User } from "firebase/auth";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

type ContactType = {
  email: string;
  name: string;
};

type EmailPayloadType = {
  category: string;
  content: string;
  subject: string;
  subtitle?: string;
  to: ContactType;
  origin: ContactType;
};

export const sendEmail = async (
  user: User | null,
  payload: EmailPayloadType
) => {
  const result = await fetch(`${backendEndpoint}send-mail/`, {
    method: "post",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
