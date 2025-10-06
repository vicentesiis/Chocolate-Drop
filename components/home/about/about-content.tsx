export function AboutContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2
          className={`
            font-display text-2xl font-bold tracking-tight
            md:text-4xl
          `}
        >
          Acerca de Nosotros
        </h2>
        <p className="text-lg text-muted-foreground">
          Una fusión única de tradición brasileña y sabores mexicanos
        </p>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          Nuestros chocolates son <strong>100% artesanales</strong>, creados con recetas
          originales que hemos desarrollado a lo largo de nuestra trayectoria. Nos
          especializamos en <strong>brigadeiros gourmet</strong>, esos dulces típicos de
          Brasil que están presentes en todas las bodas y celebraciones.
        </p>

        <p>
          Hemos transformado esta tradición brasileña en algo único, adaptándola a nuestros
          conocimientos y al gusto mexicano. Cada creación utiliza exclusivamente{" "}
          <strong>chocolate belga</strong> y <strong>ingredientes orgánicos</strong>,
          garantizando la más alta calidad en cada bocado.
        </p>

        <p>
          La innovación es parte de nuestra esencia:{" "}
          <strong>creamos un sabor nuevo cada mes</strong>, explorando combinaciones que
          sorprenden y deleitan a nuestros clientes.
        </p>
      </div>
    </div>
  );
}