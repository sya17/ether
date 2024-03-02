import { Button } from "@/components/ui/button";
import { Loader2, LogInIcon, SaveIcon } from "lucide-react";

export default function ButtonSave({
  loading,
  doSave,
}: {
  loading: boolean;
  doSave: () => void;
}) {
  return (
    <Button
      className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
      aria-disabled={loading}
      disabled={loading}
      onClick={doSave}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <SaveIcon className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
          <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 mx-auto left-8">
            Save
          </span>
        </>
      )}
    </Button>
  );
}
