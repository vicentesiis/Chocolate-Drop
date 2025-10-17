import { Button } from "../../ui/button";
import type { ButtonProps } from "../../ui/button";
import { ShieldCheck } from "lucide-react";
import { cn } from "../../../lib/utils";

interface SubmitButtonProps extends Omit<ButtonProps, "children"> {
  isSubmitting?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showValidationMessage?: boolean;
  validationMessage?: string;
}

export function SubmitButton({
  isSubmitting = false,
  loadingText = "Procesando...",
  children = "Confirmar Compra",
  icon = <ShieldCheck className="!size-6" />,
  showValidationMessage = false,
  validationMessage = "Completa todos los campos para continuar",
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <div className="w-full">
      <Button
        disabled={disabled || isSubmitting}
        className={cn(
          "w-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200",
          className,
        )}
        {...props}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            {loadingText}
          </div>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </Button>

      {showValidationMessage && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          {validationMessage}
        </p>
      )}
    </div>
  );
}
