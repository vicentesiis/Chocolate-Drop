import {
  Baby,
  BriefcaseBusiness,
  Cake,
  Heart,
  PartyPopper,
} from "lucide-react";

// Pricing constants
export const UNIT_PRICE_PASTELITOS = 75; // MXN
export const UNIT_PRICE_BRIGADEIROS = 50; // MXN
export const MIN_PASTELITOS = 50;
export const MIN_BRIGADEIROS = 100;
export const CART_RENTAL_PRICE = 2800; // MXN flat
export const SERVICE_HOURS = 3; // for copy only

// Event types configuration
export const EVENT_TYPES = [
  { icon: PartyPopper, id: "social", label: "Social" },
  { icon: Heart, id: "boda", label: "Boda" },
  { icon: BriefcaseBusiness, id: "corporativo", label: "Corporativo" },
  { icon: Cake, id: "cumpleaños", label: "Cumpleaños" },
  { icon: Baby, id: "baby", label: "Baby Shower" },
];

// Cities list
export const CITIES = [
  "Monterrey",
  "San Pedro",
  "San Nicolás",
  "Guadalupe",
  "Apodaca",
  "Santa Catarina",
  "General Escobedo",
];

// Sample flavors (tags let us group visually). In real app, fetch from admin.
export const FLAVORS = [
  {
    id: "chococlassic",
    label: "Chocolate Clásico",
    tags: ["Clásico", "Chocolate"],
  },
  {
    id: "brigadeiro80",
    label: "Brigadeiro 80%",
    tags: ["Premium", "Chocolate"],
  },
  { id: "nutella", label: "Nutella", tags: ["Clásico", "Nuez"] },
  { id: "fresa", label: "Fresa", tags: ["Fruta"] },
  { id: "maracuya", label: "Maracuyá", tags: ["Fruta", "Premium"] },
  { id: "oreo", label: "Oreo", tags: ["Clásico"] },
  { id: "avellana", label: "Avellana", tags: ["Nuez", "Premium"] },
];
