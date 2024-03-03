import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function ButtonDelete({
  doDeleteSelected,
}: {
  doDeleteSelected: () => void;
}) {
  return (
    <Button
      onClick={doDeleteSelected}
      className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
    >
      <Trash className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-16" />
      <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
        Delete
      </span>
    </Button>
  );
}
