export interface Event {
  city: string;
  date?: Date;
  name: string;
  phone: string;
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  subtotalExtras?: number;
  subtotalProducts?: number;
  total?: number;
  type: string;
  withCart: boolean;
}
