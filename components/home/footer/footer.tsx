import { Separator } from "@/components/ui/separator";
import { FooterContent } from "./footer-content";
import { FooterLinks } from "./footer-links";

export function Footer() {
  return (
    <footer
      className={`border-t border-orange-200/30 bg-gradient-to-r from-orange-50/50 to-amber-50/50`}
    >
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-12">
        {/* Main Footer Content */}
        <div
          className={`
            grid grid-cols-1 gap-8
            md:grid-cols-4
            lg:gap-12
          `}
        >
          {/* Logo & Description - Takes 2 columns on larger screens */}
          <FooterContent />

          {/* Navigation Sections */}
          <FooterLinks />
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-6">
        <div className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">Chocolate Drop</span>. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}