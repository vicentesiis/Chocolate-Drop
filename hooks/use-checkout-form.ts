import { useState } from "react";
import { toast } from "sonner";
import { 
  CustomerData, 
  ValidationErrors, 
  validateCustomerData, 
  getMissingFields, 
  getValidationMessage 
} from "@/lib/checkout-utils";

export const useCheckoutForm = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    name: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateFields = (): boolean => {
    const newErrors = validateCustomerData(customerData);
    setErrors(newErrors);

    const missingFields = getMissingFields(newErrors);
    
    if (missingFields.length > 0) {
      const message = getValidationMessage(missingFields);
      toast.error(message);
    }

    return !newErrors.name && !newErrors.phone;
  };

  return {
    customerData,
    errors,
    handleInputChange,
    validateFields,
  };
};