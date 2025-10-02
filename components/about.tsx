"use client";

import { Award, Check, Heart, Users } from "lucide-react";
import Image from "next/image";

const highlights = [
  "Recetas 100% originales y artesanales",
  "Chocolate belga e ingredientes orgánicos",
  "Tradición brasileña adaptada al gusto mexicano",
  "Un sabor nuevo cada mes",
];

const stats = [
  { icon: Heart, label: "Clientes Satisfechos", value: "500+" },
  { icon: Award, label: "Sabores Únicos", value: "20+" },
  { icon: Users, label: "Eventos Endulzados", value: "100+" },
];

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  return (
    <section
      className={`
        py-16
        lg:py-24
        ${className || ""}
      `}
    >
      <div
        className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            grid gap-12
            lg:grid-cols-2 lg:items-center
          `}
        >
          {/* Main Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2
                className={`
                  font-display text-3xl font-bold tracking-tight
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

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full bg-primary/20`}
                  >
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="space-y-6">
            <div
              className={`
                relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10
                to-primary/5
              `}
            >
              <Image
                src="/brigadeiros/preparing-brigadeiro.jpg"
                alt="Brigadeiros artesanales siendo preparados"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`rounded-xl bg-primary/5 p-4 text-center`}>
                    <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <div className="text-lg font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
