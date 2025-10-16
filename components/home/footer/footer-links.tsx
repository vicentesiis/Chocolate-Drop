import Link from "next/link";

const footerSections = [
  {
    title: "Productos",
    links: [
      {
        title: "Brigadeiros Gourmet",
        href: "#packages",
      },
      {
        title: "Empaques Personalizados",
        href: "#packages",
      },
      {
        title: "Eventos Especiales",
        href: "#events",
      },
      {
        title: "Carrito de Postres",
        href: "#events",
      },
    ],
  },
  {
    title: "Empresa",
    links: [
      {
        title: "Sobre Nosotros",
        href: "#about-us",
      },
      {
        title: "Nuestra Historia",
        href: "#about-us",
      },
      {
        title: "Ubicación",
        href: "#contact",
      },
    ],
  },
];

export function FooterLinks() {
  return (
    <>
      {footerSections.map(({ title, links }) => (
        <div key={title}>
          <h6 className="mb-4 font-semibold text-foreground">{title}</h6>
          <ul className="space-y-3">
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className={`
                    text-muted-foreground transition-colors
                    hover:text-foreground
                  `}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
