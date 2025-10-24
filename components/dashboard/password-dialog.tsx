"use client";

import { FormFieldInput } from "@/components/shared/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PasswordDialogProps {
  onAuthenticated: () => void;
  open: boolean;
}

// TODO: Move this to environment variables for production
// You can change this password here for now
const DASHBOARD_PASSWORD = "admin123";

const passwordSchema = z.object({
  password: z.string().min(1, "La contraseña es requerida"),
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export function PasswordDialog({ onAuthenticated, open }: PasswordDialogProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormData>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const handleSubmit = form.handleSubmit(async (data: PasswordFormData) => {
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (data.password === DASHBOARD_PASSWORD) {
      onAuthenticated();
      form.reset();
    } else {
      setError("Contraseña incorrecta");
    }

    setIsLoading(false);
  });

  return (
    <Dialog onOpenChange={() => undefined} open={open}>
      <DialogContent
        className={`
          sm:max-w-md
          [&>div>button]:hidden
        `}
      >
        <DialogHeader>
          <DialogTitle>Acceso al Dashboard</DialogTitle>
          <DialogDescription>
            Ingresa la contraseña para acceder al panel de administración
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormFieldInput
              autoFocus
              control={form.control}
              disabled={isLoading}
              icon={Lock}
              label="Contraseña"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
              type="password"
            />
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <Button
              className="w-full"
              disabled={isLoading || !form.watch("password")?.trim()}
              type="submit"
            >
              {isLoading ? "Verificando..." : "Ingresar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
