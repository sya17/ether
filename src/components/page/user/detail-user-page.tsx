"use client";

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
import {
  getUser,
  getUserById,
  patchUser,
  postUser,
} from "@/lib/redux/slices/userSlice";
import { useDispatch } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const DetailUserPage = ({
  openDetail,
  setOpenDetail,
  dataDetail,
}: {
  openDetail: boolean;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  dataDetail: User;
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const formSchema = z.object({
    id: z.number(),
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
  });

  async function onSave(values: z.infer<typeof formSchema>) {
    if (isEdit) {
      values.id = dataDetail.id!;
      await dispatch(
        patchUser({
          id: dataDetail.id,
          value: values,
        })
      );
    } else {
      await dispatch(postUser(values));
    }
    await dispatch(getUser({ page: 0, size: 10 }));
    setOpenDetail(false);
    form.reset();
  }

  useEffect(() => {
    form.reset();
    if (dataDetail) {
      console.log("dataDetail.id ", dataDetail.id);

      dispatch(getUserById(dataDetail.id));

      form.setValue("name", dataDetail.name);
      form.setValue("username", dataDetail.username);
    }
    setIsEdit(
      dataDetail && dataDetail.id != undefined && dataDetail.id != null
    );
  }, [form, dispatch, dataDetail]);

  return (
    <FormDetail
      open={openDetail}
      setOpen={setOpenDetail}
      title="User"
      desc="Masterdata of User"
    >
      <div className="flex flex-col space-y-4 w-full h-full">
        <Form {...form}>
          <form className="flex flex-col space-y-4">
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
                      className="text-primary bg-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex space-x-2 justify-center">
          {/* <Button
            onClick={() => doOpenClosed({ open: false, data: undefined })}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(doSave)}>Save</Button> */}

          <Button
            className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
            onClick={() => setOpenDetail(!openDetail)}
          >
            <Undo2 className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
            <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 mx-auto left-8">
              Cancel
            </span>
          </Button>
          <Button
            className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
            onClick={form.handleSubmit(onSave)}
          >
            <SaveIcon className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
            <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 mx-auto left-8">
              Save
            </span>
          </Button>
        </div>
      </div>
    </FormDetail>
  );
};
export default DetailUserPage;
