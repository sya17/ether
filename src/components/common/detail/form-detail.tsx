import * as dialog from "@/components/ui/dialog";
import { useState } from "react";

export default function FormDetail({
  children,
  title,
  desc,
  doOpenClosed,
  openDialog,
}: {
  openDialog: boolean;
  doOpenClosed: React.Dispatch<
    React.SetStateAction<{ open: boolean; data?: any }>
  >;
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <dialog.Dialog
      modal={openDialog}
      open={openDialog}
      onOpenChange={(e) => doOpenClosed({ open: e, data: undefined })}
    >
      <dialog.DialogContent
        className="sm:max-w-1/2 flex flex-col space-y-4"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <dialog.DialogHeader>
          <dialog.DialogTitle>{title}</dialog.DialogTitle>
          <dialog.DialogDescription> {desc}</dialog.DialogDescription>
        </dialog.DialogHeader>
        {children}
      </dialog.DialogContent>
    </dialog.Dialog>
  );
}
