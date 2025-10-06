import { Award, Heart, Users } from "lucide-react";

const stats = [
  { icon: Heart, label: "Clientes Satisfechos", value: "500+" },
  { icon: Award, label: "Sabores Únicos", value: "20+" },
  { icon: Users, label: "Eventos Endulzados", value: "100+" },
];

export function AboutStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`
              rounded-xl bg-gradient-to-br from-orange-100/60 to-amber-100/40 p-4
              text-center ring-1 ring-orange-200/30 transition-all duration-300
              hover:shadow-lg
            `}
          >
            <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-lg font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}