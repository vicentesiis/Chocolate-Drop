import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, type CustomerData } from "@/lib/schemas/customer";

interface UseCustomerFormProps {
  defaultValues?: Partial<CustomerData>;
  onSubmit?: (data: CustomerData) => void;
}

export function useCustomerForm({
  defaultValues = { name: "", phone: "" },
  onSubmit,
}: UseCustomerFormProps = {}) {
  const form = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    formState: { errors, isValid, dirtyFields },
  } = form;

  // Check if individual fields are valid
  const isNameValid =
    !errors.name && dirtyFields.name && form.getValues("name").trim() !== "";
  const isPhoneValid =
    !errors.phone && dirtyFields.phone && form.getValues("phone").trim() !== "";

  // Count completed fields
  const completedFields = [isNameValid, isPhoneValid].filter(Boolean).length;

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });

  return {
    form,
    errors,
    isValid,
    isNameValid,
    isPhoneValid,
    completedFields,
    totalFields: 2,
    handleSubmit,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
    getValues: form.getValues,
  };
}
