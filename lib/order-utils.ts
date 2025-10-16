/**
 * Generates a random order number
 * @returns A formatted order number string
 */
export const generateOrderNumber = (): string => {
  // Using slice instead of deprecated substr
  return `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
};
