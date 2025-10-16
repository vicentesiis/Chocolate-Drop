import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCartState() {
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h2 className="my-2 text-xl font-semibold">Tu carrito está vacío</h2>
        <p className="mb-4 text-lg text-muted-foreground">
          Agrega algunos brigadeiros deliciosos para continuar con tu pedido
        </p>
        <Link href="/">
          <Button size="lg" className="px-8">
            Volver al inicio
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
