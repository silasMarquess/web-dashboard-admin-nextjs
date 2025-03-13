import { format } from "date-fns";
export const formatDate = (date: Date): String => {
  const formatedDate = format(date, "dd/MM/yyyy");
  return formatedDate;
};
