import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCompany, postCompany } from "@/lib/redux/slices/companySlice";
import { useDispatch } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function DetailCompanyPage() {
  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be field.",
    }),
    publicKey: z.string().min(1, {
      message: "Public Key must be field.",
    }),
    keyDevice: z.string().min(1, {
      message: "Key Device must be field.",
    }),
    codeDevice: z.string().min(1, {
      message: "Code Device must be field.",
    }),
    posCode: z.string().min(1, {
      message: "Pos Device must be field.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      publicKey: "",
      keyDevice: "",
      codeDevice: "",
      posCode: "",
    },
  });

  async function doSave(values: z.infer<typeof formSchema>) {
    await dispatch(postCompany(values));
    await dispatch(getCompany({ page: 0, size: 10 }));
  }

  return (
    <div className="flex flex-col space-y-4 w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(doSave)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="text-primary bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Public Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Public Key"
                    {...field}
                    className="text-primary bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyDevice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Device</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Key Device"
                    {...field}
                    className="text-primary bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeDevice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Device</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Code Device"
                    {...field}
                    className="text-primary bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pos Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pos Code"
                    {...field}
                    className="text-primary bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="inline-flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
