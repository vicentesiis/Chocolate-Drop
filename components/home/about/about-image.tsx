import Image from "next/image";

export function AboutImage() {
  return (
    <div
      className={`
        chocolate-shadow relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br
        from-orange-100/80 to-amber-100/60 ring-1 ring-orange-200/30
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
  );
}
