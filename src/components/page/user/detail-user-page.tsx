import FormDetail from "@/components/common/detail/form-detail";
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
import { User } from "@/interfaces/user";
import { getUser, postUser } from "@/lib/redux/slices/userSlice";
import { useDispatch } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function DetailUserPage({
  detail,
  doOpenClosed,
}: {
  detail: { open: boolean; data?: User };
  doOpenClosed: React.Dispatch<
    React.SetStateAction<{ open: boolean; data?: User }>
  >;
}) {
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be field.",
    }),
    username: z.string().min(1, {
      message: "Username must be field.",
    }),
    password: z.string().min(1, {
      message: "Password must be field.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: detail.data ? detail.data.name : "",
      username: "",
      password: "",
    },
  });

  async function doSave(values: z.infer<typeof formSchema>) {
    await dispatch(postUser(values));
    await dispatch(getUser({ page: 0, size: 10 }));
  }

  return (
    <FormDetail
      openDialog={detail.open}
      doOpenClosed={doOpenClosed}
      title="User"
      desc="Masterdata of User"
    >
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      className="text-primary bg-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="inline-flex justify-end">
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </div>
    </FormDetail>
  );
}