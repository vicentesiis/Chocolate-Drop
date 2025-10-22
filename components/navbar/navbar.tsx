import { CartSheet } from "@/components/cart";
import Link from "next/link";

import { Button } from "../ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { OrderSearchDialog } from "./order-search-dialog";

const Navbar = () => {
  return (
    <nav
      className={`
        sticky top-0 z-50 h-16 border-b border-border/40 bg-background/95
        backdrop-blur-md transition-all duration-200
        supports-[backdrop-filter]:bg-background/80
        lg:h-20
      `}
    >
      <div
        className={`
          relative mx-auto flex h-full max-w-(--breakpoint-xl) items-center px-6
        `}
      >
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Menu - Centered */}
        <div
          className={`
            absolute left-1/2 hidden -translate-x-1/2 transform
            md:flex
          `}
        >
          <NavMenu />
        </div>

        <div
          className={`
            ml-auto flex items-center gap-3
            sm:gap-6
          `}
        >
          <Link href="/quote-event">
            <Button
              className={`
                hidden
                md:inline-flex
              `}
            >
              Cotiza tu Evento!
            </Button>
          </Link>
          <OrderSearchDialog />
          <CartSheet />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
