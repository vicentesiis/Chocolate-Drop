import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventDetailsSchema,
  type EventDetailsFormData,
} from "@/lib/schemas/event-details";
import type { EventDetails } from "@/lib/types/quote-event-types";

interface UseEventDetailsFormProps {
  defaultValues?: Partial<EventDetails>;
  onSubmit?: (data: EventDetailsFormData) => void;
}

export function useEventDetailsForm({
  defaultValues = {
    name: "",
    phone: "",
    city: "Monterrey",
    date: "",
    type: "social",
    time: "",
    guests: null,
  },
  onSubmit,
}: UseEventDetailsFormProps = {}) {
  const form = useForm<EventDetailsFormData>({
    resolver: zodResolver(eventDetailsSchema),
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
  const isCityValid =
    !errors.city && dirtyFields.city && form.getValues("city").trim() !== "";
  const isDateValid =
    !errors.date && dirtyFields.date && form.getValues("date").trim() !== "";

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });

  return {
    form,
    errors,
    isValid,
    isNameValid,
    isPhoneValid,
    isCityValid,
    isDateValid,
    handleSubmit,
    setValue: form.setValue,
    getValues: form.getValues,
    watch: form.watch,
  };
}
