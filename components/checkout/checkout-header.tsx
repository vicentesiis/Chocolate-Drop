import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/navbar/logo";
import { useCart } from "@/lib/contexts/cart-context";

export function CheckoutHeader() {
  const { cart } = useCart();

  return (
    <div className="mb-4 sm:mb-6 flex items-center justify-between py-2 px-2 sm:px-0 sm:py-4">
      <Link href="/">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground p-2 sm:px-3 sm:py-2"
        >
          <ArrowLeft className="mr-1 sm:mr-2 !size-5" />
          <span className="text-lg">Volver</span>
        </Button>
      </Link>

      <Logo />
    </div>
  );
}
