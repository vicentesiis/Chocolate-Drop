import { Logo } from "@/components/navbar/logo";
import { FooterSocial } from "./footer-social";

export function FooterContent() {
  return (
    <div className="md:col-span-2">
      <div className="mb-4 flex items-center gap-3">
        <Logo />
        <div>
          <h3 className={`bg-clip-text text-2xl font-bold text-primary`}>Chocolate Drop</h3>
          <p className="text-sm text-muted-foreground">Brigadeiros Gourmet</p>
        </div>
      </div>
      <p className="mb-6 max-w-md text-muted-foreground">
        Dulces brasileños hechos con amor y los mejores ingredientes. De nuestros corazones a
        tus manos.
      </p>
      <FooterSocial />
    </div>
  );
}