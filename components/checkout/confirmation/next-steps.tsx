import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function NextSteps() {
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <AlertTitle className="text-blue-900">¿Qué sigue?</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1 text-sm text-blue-800">
          <li>
            • Envíanos los detalles de tu pedido por WhatsApp para continuar.
          </li>
          <li>• Comparte tu ubicación exacta para coordinar la entrega.</li>
          <li>• El tiempo estimado de preparación y entrega es de 3 horas.</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
