import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BOXES } from "./data";

interface BoxCardProps {
  box: (typeof BOXES)[0];
  isPickerOpen: boolean;
  selectedBoxId: string | null;
  onOpenPicker: (box: (typeof BOXES)[0]) => void;
  onPickerOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function BoxCard({
  box,
  isPickerOpen,
  selectedBoxId,
  onOpenPicker,
  onPickerOpenChange,
  children,
}: BoxCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card
      className={`
        overflow-hidden transition-shadow
        hover:shadow-lg
      `}
    >
      <div
        className={`
          relative aspect-square
          sm:aspect-[4/3]
          lg:aspect-square
        `}
      >
        <img src={box.image} alt={box.name} className="h-full w-full object-cover" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle
          className={`
            text-lg leading-tight
            sm:text-xl
          `}
        >
          {box.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span
            className={`
              text-xl font-bold
              sm:text-2xl
            `}
          >
            ${box.price}
          </span>

          {isMobile ? (
            <Drawer
              open={isPickerOpen && selectedBoxId === box.id}
              onOpenChange={onPickerOpenChange}
            >
              <DrawerTrigger asChild>
                <Button size="sm" onClick={() => onOpenPicker(box)}>
                  Arma tu caja
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
          ) : (
            <Dialog
              open={isPickerOpen && selectedBoxId === box.id}
              onOpenChange={onPickerOpenChange}
            >
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => onOpenPicker(box)}>
                  Arma tu caja
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[95vh] max-w-7xl overflow-hidden">
                <DialogHeader>
                  <DialogTitle>{box.name}</DialogTitle>
                </DialogHeader>
                {children}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
