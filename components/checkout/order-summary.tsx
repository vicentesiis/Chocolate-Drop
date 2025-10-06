import { BoxCartItem } from "@/components/cart/box-cart-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/contexts/cart-context";
import { formatPrice } from "@/lib/checkout-utils";

export function OrderSummary() {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <BoxCartItem
              key={`${item.boxType.id}-${item.totalPrice}-${index}`}
              item={item}
              index={index}
              onRemove={removeFromCart}
            />
          ))}
          <div className={`
            flex items-center justify-between border-t pt-2 text-xl font-semibold text-primary
          `}>
            <span>Total:</span> 
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}