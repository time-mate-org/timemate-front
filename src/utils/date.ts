import { toDate } from "date-fns";

const toUTCDate = (iso: string) => toDate(`${iso}Z`);

export { toUTCDate };
