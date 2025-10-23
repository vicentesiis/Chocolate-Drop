// Utility functions for quote event functionality

export function pesos(n: number) {
  return n.toLocaleString("es-MX", {
    currency: "MXN",
    maximumFractionDigits: 0,
    style: "currency",
  });
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
