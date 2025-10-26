// Default format for Mexico with time
export const formatDate = (date: Date | string | any) => {
  let dateObj: Date;

  if (typeof date === "string") {
    dateObj = new Date(date);
  } else if (date && typeof date.toDate === "function") {
    // Handle Firestore Timestamp
    dateObj = date.toDate();
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return "-";
  }

  if (!dateObj || Number.isNaN(dateObj.getTime())) return "-";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Monterrey",
  }).format(dateObj);
};

// Date only format for simple date display
export const formatDateOnly = (date: Date | string | any) => {
  let dateObj: Date;

  if (typeof date === "string") {
    dateObj = new Date(date);
  } else if (date && typeof date.toDate === "function") {
    // Handle Firestore Timestamp
    dateObj = date.toDate();
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return "-";
  }

  if (!dateObj || Number.isNaN(dateObj.getTime())) return "-";

  return dateObj.toLocaleDateString("es-MX", {
    timeZone: "America/Monterrey",
  });
};

// Date with full month name and time
export const formatDateWithTime = (date: Date) => {
  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Monterrey",
  });
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(price);
};
