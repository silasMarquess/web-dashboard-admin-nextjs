export const formatToLocaleBR = (dateString: string) => {
  const dateFormated = new Date(dateString).toLocaleDateString("pr-BR", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return dateFormated;
};
