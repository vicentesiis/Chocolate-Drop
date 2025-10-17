import { BoxCartItem } from "@/components/cart/box-cart-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/contexts/cart-context";
import { formatPrice } from "@/lib/checkout-utils";
import { ShoppingCart, Package, Gift } from "lucide-react";

export function OrderSummary() {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-muted p-3">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Tu carrito está vacío
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const subtotal = totalPrice;

  return (
    <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border/50 pb-4 sm:pb-6 px-4 sm:px-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <span className="text-lg sm:text-xl font-bold text-foreground">
                Resumen del Pedido
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal hidden sm:block">
                Revisa tu selección antes de continuar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/15 text-primary border-primary/20 text-sm px-2 py-1"
            >
              {cart.length} {cart.length === 1 ? "empaque" : "empaques"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/30">
          {cart.map((item, index) => (
            <div
              key={`${item.boxType.id}-${item.totalPrice}-${index}`}
              className="sm:px-4 lg:px-6 hover:bg-muted/20 transition-colors duration-200"
            >
              <BoxCartItem
                item={item}
                index={index}
                onRemove={removeFromCart}
                className="!border-0 !shadow-none !bg-transparent !rounded-none"
              />
            </div>
          ))}
        </div>

        {/* Order Breakdown */}
        <div className="border-t border-border/50 bg-gradient-to-r from-muted/10 to-muted/20 p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-semibold text-foreground">
              Total del Pedido:
            </span>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
              <p className="text-xs text-muted-foreground">IVA incluido</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
