import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import { mainComponents } from "@/constant/component-constant";
import { Plus } from "lucide-react";

export default function ButtonAdd({
  openCloseDetail,
}: {
  openCloseDetail: (val: boolean) => void;
}) {
  return (
    <Button
      className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
      onClick={() => openCloseDetail(true)}
    >
      <Plus className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
      <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
        Add
      </span>
    </Button>
  );
}
