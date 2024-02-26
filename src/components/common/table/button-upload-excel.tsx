import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, UploadIcon } from "lucide-react";

export default function ButtonUploadExcel({}) {
  return (
    // <Button
    //   onClick={() => {}}
    //   className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
    // >
    //   <Trash className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-16" />
    //   <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
    //   </span>
    // </Button>
    <Input
      id="picture"
      type="file"
      className="inline-flex space-x-2 items-center bg-primary text-primary-foreground"
    />
  );
}
