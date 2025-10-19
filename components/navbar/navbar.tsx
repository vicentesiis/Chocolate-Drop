import { CartSheet } from "@/components/cart";
import Link from "next/link";

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
          mx-auto flex h-full max-w-(--breakpoint-xl) items-center
          justify-between px-6
        `}
      >
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div
          className={`
            hidden
            md:flex
          `}
        >
          <NavMenu />
        </div>

        <div
          className={`
            flex items-center gap-2
            sm:gap-6
          `}
        >
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
