import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { CheckCircle, type LucideIcon } from "lucide-react";

interface FormFieldInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  containerClassName?: string;
  control: Control<TFieldValues>;
  helperText?: string;
  icon?: LucideIcon;
  isValid?: boolean;
  label: string;
  name: TName;
  onFieldChange?: (value: string) => void;
}

export function FormFieldInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  containerClassName,
  control,
  helperText,
  icon: Icon,
  isValid,
  label,
  name,
  onFieldChange,
  required,
  ...inputProps
}: FormFieldInputProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          <FormLabel className="flex items-center text-sm font-medium">
            {label}
            {required && " *"}
            {isValid && <CheckCircle className="ml-2 h-4 w-4 text-green-600" />}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                {...inputProps}
                className={cn(
                  "transition-all duration-200",
                  Icon && "pl-10",
                  fieldState.error &&
                    `
                      border-red-500 bg-red-50/50
                      focus-visible:ring-red-500
                    `,
                  isValid &&
                    `
                      border-green-500 bg-green-50/50
                      focus-visible:ring-green-500
                    `,
                  !fieldState.error && !isValid && "focus-visible:ring-primary",
                  className,
                )}
                onChange={(e) => {
                  field.onChange(e);
                  onFieldChange?.(e.target.value);
                }}
              />
              {Icon && (
                <Icon
                  className={cn(
                    "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2",
                    fieldState.error && "text-red-500",
                    isValid && "text-green-600",
                    !fieldState.error && !isValid && "text-muted-foreground",
                  )}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
          {helperText && !fieldState.error && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
        </FormItem>
      )}
    />
  );
}

FormFieldInput.displayName = "FormFieldInput";

// Toggle Group Form Field Component
interface ToggleOption {
  icon?: LucideIcon;
  id: string;
  label: string;
}

interface FormFieldToggleGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  containerClassName?: string;
  control: Control<TFieldValues>;
  helperText?: string;
  label: string;
  name: TName;
  onFieldChange?: (value: string) => void;
  options: ToggleOption[];
}

export function FormFieldToggleGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  containerClassName,
  control,
  helperText,
  label,
  name,
  onFieldChange,
  options,
}: FormFieldToggleGroupProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map(({ icon: Icon, id, label: optionLabel }) => (
                <Toggle
                  className={cn(
                    `
                      rounded-full px-3 py-2 text-sm
                      data-[state=on]:bg-primary
                      data-[state=on]:text-primary-foreground
                    `,
                    field.value === id ? "" : "bg-muted",
                  )}
                  key={id}
                  onPressedChange={() => {
                    field.onChange(id);
                    onFieldChange?.(id);
                  }}
                  pressed={field.value === id}
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {optionLabel}
                </Toggle>
              ))}
            </div>
          </FormControl>
          <FormMessage />
          {helperText && !fieldState.error && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
        </FormItem>
      )}
    />
  );
}

FormFieldToggleGroup.displayName = "FormFieldToggleGroup";
