import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NextStepsProps {
  variant?: "event" | "order";
}

export function NextSteps({ variant = "order" }: NextStepsProps) {
  const content = {
    event: {
      steps: [
        "• Envíanos los detalles de tu evento por WhatsApp para facilitar el proceso.",
        "• Confirmaremos disponibilidad y detalles",
        "• Coordinaremos la fecha y hora del evento",
      ],
      title: "¿Qué sigue?",
    },
    order: {
      steps: [
        "• Envíanos los detalles de tu pedido por WhatsApp para facilitar el proceso.",
        "• Comparte tu ubicación exacta para coordinar la entrega.",
        "• El tiempo estimado de preparación y entrega es de 3 horas.",
      ],
      title: "¿Qué sigue?",
    },
  };

  const { steps, title } = content[variant];

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <AlertTitle className="text-blue-900">{title}</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1 text-sm text-blue-800">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
