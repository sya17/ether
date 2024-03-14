import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import * as drawer from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function FormDetail({
  children,
  title,
  desc,
  openDetail,
  closeDetail,
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
  openDetail: boolean;
  closeDetail: () => void;
}) {
  return (
    <Sheet onOpenChange={closeDetail} open={openDetail}>
      <SheetContent side={"right"} onInteractOutside={closeDetail}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{desc}</SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
