import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface ConfirmButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
}

export function ConfirmButton({
  onClick,
  disabled,
  isSubmitting,
  isFormValid,
}: ConfirmButtonProps) {
  return (
    <div className="sticky top-4">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Procesando...
          </div>
        ) : (
          <>
            <ShieldCheck className="!size-6" />
            Confirmar Compra
          </>
        )}
      </Button>

      {!isFormValid && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Completa todos los campos para continuar
        </p>
      )}
    </div>
  );
}
