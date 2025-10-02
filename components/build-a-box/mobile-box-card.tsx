import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Package } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { BOXES } from "./data";

interface MobileBoxCardProps {
  box: (typeof BOXES)[0];
  isPickerOpen: boolean;
  selectedBoxId: string | null;
  onOpenPicker: (box: (typeof BOXES)[0]) => void;
  onPickerOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function MobileBoxCard({
  box,
  isPickerOpen,
  selectedBoxId,
  onOpenPicker,
  onPickerOpenChange,
  children,
}: MobileBoxCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-50/60 p-4 ring-1 ring-orange-200/30 chocolate-shadow transition-all duration-300 hover:ring-orange-300/40 hover:shadow-lg">
      <h3 className="text-lg font-bold leading-relaxed text-primary">{box.name}</h3>
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <img
          src={box.image}
          alt={box.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        <Drawer open={isPickerOpen && selectedBoxId === box.id} onOpenChange={onPickerOpenChange}>
          <DrawerTrigger asChild>
            <Button
              size="lg"
              onClick={() => onOpenPicker(box)}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 hover:scale-105 gap-2"
            >
              <Package className="h-4 w-4" />
              Armar - <span className="font-bold">${box.price}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] bg-gradient-to-br from-amber-50/90 to-orange-50/80">
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle />
              </DrawerHeader>
            </VisuallyHidden>
            <div className="px-4">{children}</div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
