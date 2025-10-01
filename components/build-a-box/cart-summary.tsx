import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartItem } from "./types";

interface CartSummaryProps {
  cart: CartItem[];
}

export function CartSummary({ cart }: CartSummaryProps) {
  if (cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart ({cart.length} items)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={`cart-${index}`}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.boxType.image}
                  alt={item.boxType.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium">{item.boxType.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.selectedDesserts.length} varieties
                  </p>
                </div>
              </div>
              <span className="font-bold">${item.totalPrice}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold">Total: ${total}</span>
            <Button size="lg">Proceed to Checkout</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
