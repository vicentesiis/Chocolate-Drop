import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface MobileActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSubmitting: boolean;
}

export function MobileActionButton({
  onClick,
  disabled,
  isSubmitting,
}: MobileActionButtonProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 safe-area-pb">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-14 text-base font-semibold shadow-lg active:scale-95 transition-all duration-200"
        size="lg"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
            Procesando...
          </div>
        ) : (
          <>
            <ShieldCheck className="!size-6" />
            Confirmar Compra
          </>
        )}
      </Button>
    </div>
  );
}
