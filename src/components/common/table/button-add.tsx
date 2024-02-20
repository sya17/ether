import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import { mainComponents } from "@/constant/component-constant";
import { Plus } from "lucide-react";

export default function ButtonAdd({
  addPage,
  title,
  desc,
}: {
  addPage: string;
  title: string;
  desc: string;
}) {
  const ComponentDetail = mainComponents[addPage];
  return (
    <dialog.Dialog>
      <dialog.DialogTrigger asChild>
        <Button className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative">
          <Plus className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
          <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
            Add
          </span>
        </Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent
        className="sm:max-w-1/2 flex flex-col space-y-4"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <dialog.DialogHeader>
          <dialog.DialogTitle>{title}</dialog.DialogTitle>
          <dialog.DialogDescription>{desc}</dialog.DialogDescription>
        </dialog.DialogHeader>
        {/* Detail Page */}
        <ComponentDetail />
      </dialog.DialogContent>
    </dialog.Dialog>
  );
}
