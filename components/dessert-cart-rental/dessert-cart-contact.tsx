import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function DessertCartContact() {
  return (
    <div className={`space-y-3 border-t border-border/50 pt-6`}>
      <h4 className="font-semibold text-foreground">Información de Contacto</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-primary" />
          <Link
            className={`
              text-muted-foreground
              hover:text-primary
            `}
            href="tel:+1234567890"
          >
            81139295772
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <Link
            className={`
              text-muted-foreground
              hover:text-primary
            `}
            href="mailto:events@chocolatedrop.com"
          >
            events@chocolatedrop.com
          </Link>
        </div>
        <div className="pt-2">
          <Link
            className={`
              text-sm text-primary
              hover:underline
            `}
            href="/contact"
          >
            Completa nuestro formulario de contacto →
          </Link>
        </div>
      </div>
    </div>
  );
}
