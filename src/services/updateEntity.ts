import { User } from "firebase/auth";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

type UpdateEntityParamType<T> = {
  user: User;
  entityId: number;
  resource: string;
  payload: T;
};

export const updateEntity = async <T extends object>({
  user,
  entityId,
  resource,
  payload,
}: UpdateEntityParamType<T>) => {
  const result = await fetch(
    `${backendEndpoint}${resource}/update/${entityId}`,
    {
      method: "put",
      headers: {
        credentials: "include",
        Authorization: (await user?.getIdToken()) || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (result.status === 409)
    throw new Error(
      `ou cliente ou profissional já esta agendado nesse período.`
    );
  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);
};
