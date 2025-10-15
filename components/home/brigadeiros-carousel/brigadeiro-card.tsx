import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface BrigadeiroCardProps {
  brigadeiro: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export function BrigadeiroCard({ brigadeiro }: BrigadeiroCardProps) {
  return (
    <Link href="/build-a-box" className="block h-full touch-manipulation">
      <Card
        className={`
          group h-full cursor-pointer overflow-hidden border-orange-100 transition-all duration-200
          hover:shadow-lg
          active:scale-[0.98]
          sm:hover:scale-105 sm:active:scale-95
        `}
      >
        <div className={`relative aspect-square bg-gradient-to-br from-orange-50 to-amber-50`}>
        <Image
          src={brigadeiro.image}
          alt={brigadeiro.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className={`
            object-contain p-4 transition-transform duration-200
            group-hover:scale-105
          `}
          loading="lazy"
        />
        </div>
        <CardContent
          className={`
            p-2.5
            sm:p-4
          `}
        >
          <h3
            className={`
              mb-1 text-sm font-semibold text-primary
              sm:text-xl
            `}
          >
            {brigadeiro.name}
          </h3>
          <p
            className={`
              line-clamp-3 hidden text-sm text-gray-600
              sm:block
            `}
          >
            {brigadeiro.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
