import { backendEndpoint } from "./utils";
import { GetPdfReportParamType } from "./types";
import { format, toDate } from "date-fns";

export const getPdfReport = async ({
  end_date,
  professional_id,
  user,
  start_date,
}: GetPdfReportParamType): Promise<string> => {
  const body = JSON.stringify({
    professional_id,
    start_date: format(toDate(start_date), "yyyy-MM-dd"),
    end_date: format(toDate(end_date), "yyyy-MM-dd"),
  });

  const result = await fetch(`${backendEndpoint}report/`, {
    method: "post",
    headers: {
      credentials: "include",
      Authorization: (await user?.getIdToken()) || "",
      "Content-Type": "application/json",
    },
    body,
  });

  if (result.status !== 200)
    throw new Error(`erro desconhecido: tente novamente mais tarde.`);

  return result.text();
};
