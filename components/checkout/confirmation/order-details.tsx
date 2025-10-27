import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useState } from "react";

interface OrderDetailsProps {
  orderNumber: string;
}

export function OrderDetails({ orderNumber }: OrderDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Detalles del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">ID del Pedido:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono">{orderNumber}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyOrderNumber}
                className="h-8 px-2"
              >
                <Copy className="h-3 w-3" />
                <span className="ml-1 text-xs">
                  {copied ? "¡Copiado!" : "Copiar"}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Estado:</span>
            <span className="text-green-600">Confirmado</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha:</span>
            <span>{new Date().toLocaleDateString("es-MX")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
