import * as dialog from "@/components/ui/dialog";
import { mainComponents } from "@/constant/component-constant";
import { Pencil } from "lucide-react";

export const ButtonEdit = <T extends object>({
  page,
  title,
  desc,
  doDetail,
  doDeleted,
}: {
  page: string;
  title: string;
  desc: string;
  doDetail: (Values: T) => void;
  doDeleted: (selected: T) => void;
}) => {
  const ComponentDetail = mainComponents[page];
  return (
    <dialog.Dialog>
      <dialog.DialogTrigger asChild>
        <div className="inline-flex space-x-2">
          <Pencil className="w-4 h-4" />
          <span>Edit</span>
        </div>
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
};

export default ButtonEdit;
