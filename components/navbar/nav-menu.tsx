import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Calendar, Home, Package, Users } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

interface NavMenuProps extends NavigationMenuProps {
  onItemClick?: () => void;
}

export const NavMenu = ({ onItemClick, ...props }: NavMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList
      className={`
        gap-1 space-x-0
        data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start
        data-[orientation=vertical]:gap-1
        sm:gap-2
      `}
    >
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="/"
            onClick={onItemClick}
            className={`
              group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-md px-2 py-2
              text-xl font-medium text-primary transition-colors
              hover:bg-accent hover:text-accent-foreground
              disabled:pointer-events-none disabled:opacity-50
              data-[active]:bg-accent/50
              data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start
              data-[state=open]:bg-accent/50
              sm:gap-2 sm:px-4
              lg:gap-2.5 lg:px-4
            `}
          >
            <Home
              className={`
                h-5 w-5
                sm:hidden
              `}
            />
            <span>Inicio</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <Separator
        className={`
          bg-primary
          sm:hidden
        `}
      />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="/build-a-box"
            onClick={onItemClick}
            className={`
              group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-md px-2 py-2
              text-xl font-medium text-primary transition-colors
              hover:bg-accent hover:text-accent-foreground
              disabled:pointer-events-none disabled:opacity-50
              data-[active]:bg-accent/50
              data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start
              data-[state=open]:bg-accent/50
              sm:gap-2 sm:px-4
              lg:gap-2.5 lg:px-4
            `}
          >
            <Package
              className={`
                h-5 w-5
                sm:hidden
              `}
            />
            <span>Empaques</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <Separator
        className={`
          bg-primary
          sm:hidden
        `}
      />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="#events"
            onClick={onItemClick}
            className={`
              group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-md px-2 py-2
              text-xl font-medium text-primary transition-colors
              hover:bg-accent hover:text-accent-foreground
              disabled:pointer-events-none disabled:opacity-50
              data-[active]:bg-accent/50
              data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start
              data-[state=open]:bg-accent/50
              sm:gap-2 sm:px-4
              lg:gap-2.5 lg:px-4
            `}
          >
            <Calendar
              className={`
                h-5 w-5
                sm:hidden
              `}
            />
            <span>Eventos</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <Separator
        className={`
          bg-primary
          sm:hidden
        `}
      />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="#about-us"
            onClick={onItemClick}
            className={`
              group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-md px-2 py-2
              text-xl font-medium text-primary transition-colors
              hover:bg-accent hover:text-accent-foreground
              disabled:pointer-events-none disabled:opacity-50
              data-[active]:bg-accent/50
              data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start
              data-[state=open]:bg-accent/50
              sm:gap-2 sm:px-4
              lg:gap-2.5 lg:px-4
            `}
          >
            <Users
              className={`
                h-5 w-5
                sm:hidden
              `}
            />
            <span>Nosotros</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
