import { CheckCircle } from "lucide-react";

export function ConfirmationHeader() {
  return (
    <div className="text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="mb-2 text-3xl font-bold">¡Pedido Confirmado!</h1>
      <p className="mb-8 text-muted-foreground">
        Gracias por tu compra. Hemos recibido tu pedido correctamente.
      </p>
    </div>
  );
}