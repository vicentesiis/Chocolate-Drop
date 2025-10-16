import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ConfirmationActions() {
  return (
    <div
      className={`
      flex flex-col gap-4
      sm:flex-row
    `}
    >
      <Link href="/" className="flex-1">
        <Button variant="outline" className="w-full">
          Seguir Comprando
        </Button>
      </Link>
      <Button className="flex-1">Contactar por WhatsApp</Button>
    </div>
  );
}
