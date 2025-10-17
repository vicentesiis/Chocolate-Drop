# Usage Examples for Reusable Form Components

## Using CustomerFormFields in checkout page

```tsx
import { CustomerFormFields } from "@/components/checkout";
import { useState } from "react";
import type { CustomerData } from "@/lib/schemas/customer";

export function CheckoutPage() {
  const [customerData, setCustomerData] = useState<CustomerData>();
  const [isValid, setIsValid] = useState(false);

  const handleFormChange = (data: CustomerData, valid: boolean) => {
    setCustomerData(data);
    setIsValid(valid);
  };

  return (
    <div className="space-y-4">
      <h1>Checkout Information</h1>
      
      <CustomerFormFields
        defaultValues={{ name: "", phone: "" }}
        onFormChange={handleFormChange}
      />
      
      <button 
        disabled={!isValid}
        onClick={() => console.log("Submit:", customerData)}
      >
        Continue to Payment
      </button>
    </div>
  );
}
```

## Using individual FormInput components

```tsx
import { FormInput } from "@/components/shared/forms/form-input";
import { User, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

export function CustomForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <form className="space-y-4">
      <FormInput
        label="Full Name"
        placeholder="Enter your name"
        icon={User}
        error={errors.name?.message}
        required
        {...register("name")}
      />
      
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={Mail}
        error={errors.email?.message}
        helperText="We'll never share your email"
        required
        {...register("email")}
      />
    </form>
  );
}
```

## Using the customer form hook directly

```tsx
import { useCustomerForm } from "@/hooks/use-customer-form";

export function DirectHookUsage() {
  const {
    register,
    errors,
    isNameValid,
    isPhoneValid,
    handleSubmit,
    completedFields,
    totalFields
  } = useCustomerForm({
    defaultValues: { name: "John", phone: "" },
    onSubmit: (data) => console.log("Submitted:", data)
  });

  const isFormValid = isNameValid && isPhoneValid;

  return (
    <form onSubmit={handleSubmit}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register("phone")} />
      {errors.phone && <span>{errors.phone.message}</span>}
      
      <p>Progress: {completedFields}/{totalFields}</p>
      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  );
}
```