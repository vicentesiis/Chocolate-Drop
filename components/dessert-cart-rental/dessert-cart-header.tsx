import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DessertCartHeader() {
  return (
    <CardHeader className="p-0">
      <CardTitle
        className={`
          font-display text-3xl leading-tight font-bold tracking-tight
          md:text-4xl
        `}
      >
        Alquiler de Carrito de Postres para Eventos
      </CardTitle>
      <CardDescription className="text-lg">
        Haz que tu evento sea inolvidable con nuestro servicio de alquiler de carrito de postres.
        Perfecto para bodas, fiestas y eventos corporativos.
      </CardDescription>
    </CardHeader>
  );
}
