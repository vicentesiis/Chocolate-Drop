import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BrigadeirosCta() {
  return (
    <div
      className={`
        mt-6 text-center
        sm:mt-8
      `}
    >
      <Button asChild size="lg" className="bg-primary px-8">
        <Link href="/build-a-box">Más Productos</Link>
      </Button>
    </div>
  );
}
