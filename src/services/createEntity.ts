import { User } from "firebase/auth";
import { backendEndpoint } from "./utils";

export const createEntity = async <T extends object>(
  user: User,
  resource: string,
  payload: T
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
    throw new Error(
      `ou cliente ou profissional já esta agendado nesse período.`
    );
  if (result.status !== 201)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
