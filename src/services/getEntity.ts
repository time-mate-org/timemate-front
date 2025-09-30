import { backendEndpoint } from "./utils";
import { GetEntityParamType } from "./types";

export const getEntity = async <T extends object>({
  user,
  resource,
  id,
}: GetEntityParamType): Promise<T> => {
  const result = await fetch(`${backendEndpoint}${resource}/${id ? id : ""}`, {
    method: "get",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
  });

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);

  const entities = (await result.json()) as T;
  return entities;
};
