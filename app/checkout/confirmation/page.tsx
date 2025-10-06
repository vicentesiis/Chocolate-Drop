import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmationPage() {
  // In a real app, you'd get this from URL params or state
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-3xl font-bold">¡Pedido Confirmado!</h1>
        <p className="mb-8 text-muted-foreground">
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

      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold text-blue-900">¿Qué sigue?</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Nos pondremos en contacto contigo para coordinar la entrega</li>
          <li>• Recibirás una confirmación por WhatsApp</li>
          <li>• El tiempo de preparación es de 24-48 horas</li>
        </ul>
      </div>

      <div className={`
        flex flex-col gap-4
        sm:flex-row
      `}>
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
