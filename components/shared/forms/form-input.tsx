import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  icon?: LucideIcon;
  helperText?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      isValid,
      icon: Icon,
      helperText,
      containerClassName,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id || props.name || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label
          htmlFor={inputId}
          className="text-sm font-medium flex items-center"
        >
          {label}
          {props.required && " *"}
          {isValid && <CheckCircle className="h-4 w-4 ml-2 text-green-600" />}
        </Label>

        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              "h-12 sm:h-10 text-base sm:text-sm transition-all duration-200",
              Icon && "pl-10",
              error && "border-red-500 focus-visible:ring-red-500 bg-red-50/50",
              isValid &&
                "border-green-500 focus-visible:ring-green-500 bg-green-50/50",
              !error && !isValid && "focus-visible:ring-primary",
              className,
            )}
            {...props}
          />

          {Icon && (
            <Icon
              className={cn(
                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
                error && "text-red-500",
                isValid && "text-green-600",
                !error && !isValid && "text-muted-foreground",
              )}
            />
          )}

          {error && (
            <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
          )}
        </div>

        {error && (
          <div className="flex items-start mt-2 p-2 bg-red-50 rounded-md">
            <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 leading-tight">{error}</p>
          </div>
        )}

        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
