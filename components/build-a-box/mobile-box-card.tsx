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
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="text-lg leading-relaxed font-semibold text-card-foreground">{box.name}</h3>
      <div className="h-48 w-full overflow-hidden rounded-md">
        <img src={box.image} alt={box.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-3">
        <Drawer open={isPickerOpen && selectedBoxId === box.id} onOpenChange={onPickerOpenChange}>
          <DrawerTrigger asChild>
            <Button size="lg" onClick={() => onOpenPicker(box)} className={`w-full`}>
              <Package />
              Armar - ${box.price}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
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
