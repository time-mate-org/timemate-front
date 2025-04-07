import { User } from "firebase/auth";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

export const deleteEntity = async(
  user: User,
  resource: string,
  id: number
) => {
  const result = await fetch(`${backendEndpoint}${resource}/delete/${id}`, {
    method: "delete",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
  });
  
  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
