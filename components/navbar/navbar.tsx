import { CartSheet } from "@/components/cart-sheet";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-20 border-b border-accent bg-background">
      <div
        className={`
          mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4
          sm:px-6
        `}
      >
        <Logo />

        {/* Desktop Menu */}
        <NavMenu
          className={`
            hidden
            md:block
          `}
        />

        <div className="flex items-center gap-3">
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
