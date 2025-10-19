import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, type LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  isValid?: boolean;
  label: string;
}

export const FormInput = ({
  className,
  containerClassName,
  error,
  helperText,
  icon: Icon,
  id,
  isValid,
  label,
  ref,
  ...props
}: { ref?: React.RefObject<HTMLInputElement | null> } & FormInputProps) => {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label
        className="flex items-center text-sm font-medium"
        htmlFor={inputId}
      >
        {label}
        {props.required && " *"}
        {isValid && <CheckCircle className="ml-2 h-4 w-4 text-green-600" />}
      </Label>

      <div className="relative">
        <Input
          className={cn(
            `
                h-12 text-base transition-all duration-200
                sm:h-10 sm:text-sm
              `,
            Icon && "pl-10",
            error &&
              `
                  border-red-500 bg-red-50/50
                  focus-visible:ring-red-500
                `,
            isValid &&
              `
                  border-green-500 bg-green-50/50
                  focus-visible:ring-green-500
                `,
            !error && !isValid && "focus-visible:ring-primary",
            className,
          )}
          id={inputId}
          ref={ref}
          {...props}
        />

        {Icon && (
          <Icon
            className={cn(
              "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2",
              error && "text-red-500",
              isValid && "text-green-600",
              !error && !isValid && "text-muted-foreground",
            )}
          />
        )}

        {error && (
          <AlertCircle
            className={`
                absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500
              `}
          />
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-start rounded-md bg-red-50 p-2">
          <AlertCircle
            className={`mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-red-500`}
          />
          <p className="text-sm leading-tight text-red-600">{error}</p>
        </div>
      )}

      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

FormInput.displayName = "FormInput";
