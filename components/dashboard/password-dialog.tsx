"use client"

import { FormInput } from "@/components/shared/forms/form-input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lock } from "lucide-react"
import { useState } from "react"

interface PasswordDialogProps {
  onAuthenticated: () => void
  open: boolean
}

// TODO: Move this to environment variables for production
// You can change this password here for now
const DASHBOARD_PASSWORD = "admin123"

export function PasswordDialog({ onAuthenticated, open }: PasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    if (password === DASHBOARD_PASSWORD) {
      onAuthenticated()
      setPassword("")
    } else {
      setError("Contraseña incorrecta")
    }
    
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <Dialog onOpenChange={() => {}} open={open}>
      <DialogContent className={`
        sm:max-w-md
        [&>div>button]:hidden
      `}>
        <DialogHeader>
          <DialogTitle>Acceso al Dashboard</DialogTitle>
          <DialogDescription>
            Ingresa la contraseña para acceder al panel de administración
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput
            autoFocus
            disabled={isLoading}
            error={error}
            icon={Lock}
            id="password"
            label="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa tu contraseña"
            required
            type="password"
            value={password}
          />
          
          <Button 
            className="w-full" 
            disabled={isLoading || !password.trim()} 
            type="submit"
          >
            {isLoading ? "Verificando..." : "Ingresar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}