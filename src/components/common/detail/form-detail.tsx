import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import * as drawer from "@/components/ui/drawer";
import { useState } from "react";

export default function FormDetail({
  children,
  title,
  desc,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  const openClosed = (val: boolean) => {
    setOpen(val);
  };
  return (
    <drawer.Drawer open={open} onOpenChange={openClosed} direction="right">
      <drawer.DrawerContent
        className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-l-md px-6 rounded-r-none"
        onInteractOutside={() => openClosed(false)}
      >
        <drawer.DrawerHeader>
          <drawer.DrawerTitle>{title}</drawer.DrawerTitle>
          <drawer.DrawerDescription>{desc}</drawer.DrawerDescription>
        </drawer.DrawerHeader>
        {children}
      </drawer.DrawerContent>
    </drawer.Drawer>
  );
}
