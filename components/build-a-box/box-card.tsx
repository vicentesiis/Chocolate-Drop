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
      <div className="relative aspect-square">
        <img src={box.image} alt={box.name} className="h-full w-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{box.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${box.price}</span>

          {isMobile ? (
            <Drawer
              open={isPickerOpen && selectedBoxId === box.id}
              onOpenChange={onPickerOpenChange}
            >
              <DrawerTrigger asChild>
                <Button onClick={() => onOpenPicker(box)}>Arma tu caja</Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[95vh]">
                <DrawerHeader>
                  <DrawerTitle>Arma tu {box.name}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">{children}</div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog
              open={isPickerOpen && selectedBoxId === box.id}
              onOpenChange={onPickerOpenChange}
            >
              <DialogTrigger asChild>
                <Button onClick={() => onOpenPicker(box)}>Arma tu caja</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[95vh] max-w-7xl overflow-hidden">
                <DialogHeader>
                  <DialogTitle>Arma tu {box.name}</DialogTitle>
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
