import { BoxCartItem } from "@/components/cart/box-cart-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/contexts/cart-context";
import { formatPrice } from "@/lib/checkout-utils";

export function OrderSummary() {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-foreground">
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-muted p-3">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Empty cart icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
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
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 pb-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-foreground">
              Resumen del Pedido
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/15 px-3 py-1">
              <span className="text-sm font-semibold text-primary">
                {cart.length} {cart.length === 1 ? "caja" : "cajas"}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {cart.map((item, index) => (
            <div
              key={`${item.boxType.id}-${item.totalPrice}-${index}`}
              className="p-4 sm:p-6"
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

        <div className="border-t border-border bg-muted/20 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Total del Pedido:
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
