import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function DessertCartContact() {
  return (
    <div
      className={`
        space-y-2 border-t border-border/50 pt-4
        sm:space-y-3 sm:pt-6
      `}
    >
      <h4
        className={`
          text-sm font-semibold text-foreground
          sm:text-base
        `}
      >
        Información de Contacto
      </h4>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
          <Link
            className={`
              text-sm text-muted-foreground
              hover:text-primary
              sm:text-base
            `}
            href="tel:+528113929577"
          >
            81139295772
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
          <Link
            className={`
              text-sm break-all text-muted-foreground
              hover:text-primary
              sm:text-base
            `}
            href="mailto:events@chocolatedrop.com"
          >
            events@chocolatedrop.com
          </Link>
        </div>
      </div>
    </div>
  );
}
