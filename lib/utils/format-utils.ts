export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-ES", {
    currency: "EUR",
    style: "currency",
  }).format(price);
};
