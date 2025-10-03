import LogoSVG from "@/public/logo.svg?react";

export const Logo = () => (
  <LogoSVG
    className={`
      h-12 w-12 fill-primary
      sm:h-18 sm:w-18
    `}
  />
);
