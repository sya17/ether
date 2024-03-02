import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "../ui/use-toast";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Alert({}) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      duration: 3000,
      className: "bg-red-800 text-white",
      title: "success",
      description: "Your message has been sent.",
      action: (
        <ToastAction altText="Close">
          <X />
        </ToastAction>
      ),
    });
  }, [toast]);

  return <></>;
}
