import Image from "next/image";

export function HeroImage() {
  return (
    <div
      className={`
        chocolate-shadow warm-glow relative aspect-square w-full max-w-sm flex-shrink-0
        overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 ring-1
        ring-orange-200/50 transition-transform duration-500
        hover:scale-105
        sm:max-w-md
        lg:aspect-[1] lg:max-w-lg
        xl:max-w-xl
      `}
    >
      <Image 
        src="/hero.jpg" 
        fill 
        alt="Delicious Brazilian brigadeiros" 
        className="rounded-2xl object-cover" 
        priority 
      />
      <div
        className={`
          absolute inset-0 rounded-2xl bg-gradient-to-t from-orange-900/20 via-transparent
          to-transparent
        `}
      ></div>
      {/* Floating badge */}
      <div
        className={`
          absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold
          text-orange-800 shadow-lg backdrop-blur-sm
        `}
      >
        Artesanal
      </div>
    </div>
  );
}