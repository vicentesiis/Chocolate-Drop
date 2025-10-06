import { Button } from "@/components/ui/button";

interface CheckoutActionsProps {
  onConfirmPurchase: () => void;
  isSubmitting: boolean;
}

export function CheckoutActions({ onConfirmPurchase, isSubmitting }: CheckoutActionsProps) {
  return (
    <Button
      onClick={onConfirmPurchase}
      disabled={isSubmitting}
      className="w-full"
      size="lg"
    >
      {isSubmitting ? "Procesando..." : "Confirmar Compra"}
    </Button>
  );
}