import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/navbar/logo";

export function CheckoutHeader() {
  return (
    <div className="mb-2 flex justify-between">
      <Link
        href="/"
        className={`
          inline-flex items-center text-sm text-muted-foreground
          hover:text-foreground
        `}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al carrito
      </Link>
      <Logo />
    </div>
  );
}
