import { ShieldCheck } from "lucide-react";

import type { ButtonProps } from "../../ui/button";

import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";

interface SubmitButtonProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isSubmitting?: boolean;
  loadingText?: string;
  showValidationMessage?: boolean;
  validationMessage?: string;
}

export function SubmitButton({
  children = "Confirmar Compra",
  className,
  disabled,
  icon = <ShieldCheck className="!size-6" />,
  isSubmitting = false,
  loadingText = "Procesando...",
  showValidationMessage = false,
  validationMessage = "Completa todos los campos para continuar",
  ...props
}: SubmitButtonProps) {
  return (
    <div className="w-full">
      <Button
        className={cn(
          `
            w-full text-sm font-semibold shadow-lg transition-all duration-200
            sm:text-base
          `,
          className,
        )}
        disabled={disabled || isSubmitting}
        {...props}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div
              className={`
                mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white
              `}
            />
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
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {validationMessage}
        </p>
      )}
    </div>
  );
}
