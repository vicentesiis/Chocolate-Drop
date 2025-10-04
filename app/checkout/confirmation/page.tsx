import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmationPage() {
  // In a real app, you'd get this from URL params or state
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-8">
          Gracias por tu compra. Hemos recibido tu pedido correctamente.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalles del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Número de Pedido:</span>
              <span className="font-mono">{orderNumber}</span>
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">¿Qué sigue?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Nos pondremos en contacto contigo para coordinar la entrega</li>
          <li>• Recibirás una confirmación por WhatsApp</li>
          <li>• El tiempo de preparación es de 24-48 horas</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            Seguir Comprando
          </Button>
        </Link>
        <Button className="flex-1">Contactar por WhatsApp</Button>
      </div>
    </div>
  );
}
