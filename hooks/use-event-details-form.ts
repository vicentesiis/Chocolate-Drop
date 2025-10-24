import {
  type EventDetailsData,
  type EventDetailsFormData,
  eventDetailsFormSchema,
  transformEventDetailsFormData,
} from "@/lib/schemas/event-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseEventDetailsFormProps {
  defaultValues?: {
    city?: string;
    date?: string; // Keep as string for form handling
    name?: string;
    phone?: string;
    type?: string;
  };
  onSubmit?: (data: EventDetailsData) => void; // Now receives processed data with Date
}

export function useEventDetailsForm({
  defaultValues = {
    city: "Monterrey",
    date: "",
    name: "",
    phone: "",
    type: "social",
  },
  onSubmit,
}: UseEventDetailsFormProps = {}) {
  const form = useForm<EventDetailsFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(eventDetailsFormSchema),
  });

  const {
    formState: { dirtyFields, errors, isValid },
  } = form;

  // Check if individual fields are valid
  const isNameValid =
    !errors.name && dirtyFields.name && form.getValues("name").trim() !== "";
  const isPhoneValid =
    !errors.phone && dirtyFields.phone && form.getValues("phone").trim() !== "";
  const isCityValid =
    !errors.city && dirtyFields.city && form.getValues("city").trim() !== "";
  const isDateValid =
    !errors.date && dirtyFields.date && form.getValues("date").trim() !== "";

  const handleSubmit = form.handleSubmit((data) => {
    // Transform form data (string date) to processed data (Date object)
    const processedData = transformEventDetailsFormData(data);
    onSubmit?.(processedData);
  });

  return {
    errors,
    form,
    getValues: form.getValues,
    handleSubmit,
    isCityValid,
    isDateValid,
    isNameValid,
    isPhoneValid,
    isValid,
    setValue: form.setValue,
    watch: form.watch,
  };
}
