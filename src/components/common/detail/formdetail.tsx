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
  openCloseDetail,
}: {
  openDetail: boolean;
  openCloseDetail: (val: boolean) => void;
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  const openClosed = (val: boolean) => {
    openCloseDetail(val);
  };
  return (
    // <drawer.Drawer
    //   open={openDetail}
    //   onOpenChange={openClosed}
    //   direction="right"
    // >
    //   <drawer.DrawerContent
    //     className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-l-md px-6 rounded-r-none"
    //     onInteractOutside={() => openClosed(false)}
    //   >
    //     <drawer.DrawerHeader>
    //       <drawer.DrawerTitle>{title}</drawer.DrawerTitle>
    //       <drawer.DrawerDescription>{desc}</drawer.DrawerDescription>
    //     </drawer.DrawerHeader>
    //     {children}
    //   </drawer.DrawerContent>
    // </drawer.Drawer>
    <Sheet onOpenChange={openClosed} open={openDetail}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      {/* <SheetContent side={"right"} onInteractOutside={() => openClosed(false)}> */}
      <SheetContent side={"right"} onInteractOutside={() => openClosed(false)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{desc}</SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
