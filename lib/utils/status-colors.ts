import { EventStatus } from "@/lib/constants/event-constants";
import { OrderStatus } from "@/lib/constants/order-constants";

/**
 * Status color mapping based on badge variants
 * These colors match the solid badge variants from components/ui/badge.tsx
 */
export const statusColorMap = {
  [EventStatus.CANCELADO]: "hsl(0, 84%, 60%)", // destructive red
  [EventStatus.CONFIRMADO]: "hsl(33, 80%, 55%)", // caramel (processing)
  [EventStatus.CONTACTADO]: "hsl(33, 80%, 60%)", // warm accent (info)
  [EventStatus.FINALIZADO]: "hsl(152, 46%, 28%)", // deeper mint (completed)
  // Event status colors
  [EventStatus.LEAD]: "hsl(39, 90%, 55%)", // warm amber (pending)
  [OrderStatus.CANCELLED]: "hsl(0, 84%, 60%)", // destructive red

  [OrderStatus.CONFIRMED]: "hsl(33, 80%, 55%)", // caramel
  [OrderStatus.DELIVERED]: "hsl(152, 46%, 28%)", // deeper mint (completed)
  // Order status colors
  [OrderStatus.PENDING]: "hsl(39, 90%, 55%)", // warm amber
  [OrderStatus.PREPARING]: "hsl(33, 80%, 60%)", // warm accent (info)
  [OrderStatus.READY]: "hsl(152, 46%, 35%)", // mint success
} as const;

/**
 * Get color for a given status
 */
export function getStatusColor(status: EventStatus | OrderStatus): string {
  return statusColorMap[status] || "hsl(0, 0%, 50%)"; // fallback gray
}

/**
 * Convert HSL color to hex for better chart compatibility
 */
export function hslToHex(hsl: string): string {
  // Extract h, s, l values from hsl string
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hsl;

  const h = Number.parseInt(match[1]) / 360;
  const s = Number.parseInt(match[2]) / 100;
  const l = Number.parseInt(match[3]) / 100;

  const hue2rgb = (p: number, q: number, tParam: number) => {
    let t = tParam;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = l;
    g = l;
    b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Get hex color for a given status (chart-ready)
 */
export function getStatusHexColor(status: EventStatus | OrderStatus): string {
  const hslColor = getStatusColor(status);
  return hslToHex(hslColor);
}
