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
import { Label } from "@/components/ui/label";
import { Company } from "@/interfaces/company";
import { apiCall } from "@/lib/redux/actions/apiActions";
import { useDispatch } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { useRef, useState } from "react";
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      publicKey: "",
    },
  });

  async function doSave(values: z.infer<typeof formSchema>) {
    await dispatch(
      apiCall({
        endpoint: "Company",
        method: "POST",
        body: values,
      })
    );

    await dispatch(
      apiCall({
        endpoint: "Company",
        method: "GET",
        queryParams: { page: 0, size: 10, desc: "createdDate" },
      })
    );
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
          <div className="inline-flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
