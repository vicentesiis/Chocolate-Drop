import { BoxCartItem } from "@/components/cart/box-cart-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/checkout-utils";
import { useCart } from "@/lib/contexts/cart-context";
import { ShoppingCart } from "lucide-react";

export function OrderSummary() {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <Card className="border-0 bg-card/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle
            className={`flex items-center text-sm font-semibold text-foreground`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              flex flex-col items-center justify-center py-8 text-center
            `}
          >
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

  return (
    <Card
      className={`
        overflow-hidden border-0 bg-card/50 shadow-sm backdrop-blur-sm
      `}
    >
      <CardHeader
        className={`
          border-b border-border/50 bg-gradient-to-r from-primary/5
          via-primary/10 to-primary/5 px-4 pb-4
          sm:px-6 sm:pb-6
        `}
      >
        <CardTitle className="flex items-center justify-between">
          <div
            className={`
              flex items-center gap-2
              sm:gap-3
            `}
          >
            <div>
              <span
                className={`
                  text-lg font-bold text-foreground
                  sm:text-xl
                `}
              >
                Resumen del Pedido
              </span>
              <p
                className={`
                  hidden text-xs font-normal text-muted-foreground
                  sm:block sm:text-sm
                `}
              >
                Revisa tu selección antes de continuar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={`
                border-primary/20 bg-primary/15 px-2 py-1 text-sm text-primary
              `}
              variant="secondary"
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
              className={`
                transition-colors duration-200
                hover:bg-muted/20
                sm:px-4
                lg:px-6
              `}
              key={`${item.boxType.id}-${item.totalPrice}-${index}`}
            >
              <BoxCartItem
                className="!rounded-none !border-0 !bg-transparent !shadow-none"
                index={index}
                item={item}
                onRemove={removeFromCart}
              />
            </div>
          ))}
        </div>

        {/* Order Breakdown */}
        <div
          className={`
            space-y-3 border-t border-border/50 bg-gradient-to-r from-muted/10
            to-muted/20 p-4
            sm:p-6
          `}
        >
          <div className="flex items-center justify-between">
            <span
              className={`
                text-base font-semibold text-foreground
                sm:text-lg
              `}
            >
              Total del Pedido:
            </span>
            <div className="text-right">
              <span
                className={`
                  text-xl font-bold text-primary
                  sm:text-2xl
                `}
              >
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
