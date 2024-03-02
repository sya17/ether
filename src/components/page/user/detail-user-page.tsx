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
  getUserByKey,
  patchUser,
  postUser,
  selectResourceError,
  selectResourceLoading,
  selectSelectedResource,
} from "@/lib/redux/slices/userSliceNew";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, Undo2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserDetailProps {
  openDetail: boolean;
  openCloseDetail: (val: boolean) => void;
  dataKey: {
    id?: number;
  };
}

const DetailUserPage: React.FC<UserDetailProps> = ({
  openDetail,
  openCloseDetail,
  dataKey,
}) => {
  const dispatch = useDispatch();
  // fatch
  const data: User | null = useSelector(selectSelectedResource);

  const formSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: "Min 5 Character",
      })
      .nonempty("Name must be field."),
    username: z
      .string()
      .min(5, {
        message: "Min 5 Character",
      })
      .nonempty("Username must be field."),
    password: z
      .string()
      .min(5, {
        message: "Min 5 Character",
      })
      .nonempty("Password must be field."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const doClose = () => {
    openCloseDetail(false);
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    console.log("Start Save");

    if (dataKey && dataKey.id) {
      // values.id = key.id!;
      const dataUpdate: User = {
        id: dataKey.id,
        name: values.name,
        username: values.username,
        password: values.password,
      };

      dispatch(
        patchUser({
          key: dataKey.id,
          values: dataUpdate,
        })
      );
    } else {
      const saveData: User = {
        id: undefined,
        name: values.name,
        username: values.username,
        password: values.password,
      };
      dispatch(postUser(saveData));
    }
    doClose();
  };

  useEffect(() => {
    if (dataKey && dataKey.id) {
      dispatch(getUserByKey(dataKey.id));
    }
  }, [dataKey.id]);

  useEffect(() => {
    console.log("data ", data);

    if (data) {
      form.setValue("name", data.name);
      form.setValue("username", data.username);
    }
  }, [data]);

  useEffect(() => {
    console.log("openDetail ", openDetail);

    form.reset();
  }, [openDetail]);

  return (
    <FormDetail
      openDetail={openDetail}
      openCloseDetail={openCloseDetail}
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
          <Button
            className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
            onClick={doClose}
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
