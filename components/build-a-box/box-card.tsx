import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  return (
    <Card
      className={`
        chocolate-shadow overflow-hidden bg-gradient-to-br from-orange-50/80 to-amber-50/60 ring-1
        ring-orange-200/30 transition-all duration-300
        hover:shadow-lg hover:ring-orange-300/40
      `}
    >
      <div
        className={`
          relative aspect-square overflow-hidden
          sm:aspect-[4/3]
          lg:aspect-square
        `}
      >
        <Image
          src={box.image}
          alt={box.name}
          fill
          className={`
            object-cover transition-transform duration-300
            hover:scale-105
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent
          `}
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle
          className={`
            text-lg leading-tight font-bold text-primary
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
              text-xl font-bold text-primary
              sm:text-2xl
            `}
          >
            ${box.price}
          </span>
          <Dialog open={isPickerOpen && selectedBoxId === box.id} onOpenChange={onPickerOpenChange}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => onOpenPicker(box)}
                className={`
                  bg-gradient-to-r from-primary to-primary/90 transition-all duration-300
                  hover:scale-105 hover:from-primary/90 hover:to-primary/80
                `}
              >
                Arma tu caja
              </Button>
            </DialogTrigger>
            <DialogContent
              className={`
                max-h-[95vh] max-w-7xl overflow-hidden bg-gradient-to-br from-amber-50/90
                to-orange-50/80 ring-1 ring-orange-200/30
              `}
            >
              <DialogHeader>
                <DialogTitle>{box.name}</DialogTitle>
              </DialogHeader>
              {children}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
