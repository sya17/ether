"use client";

import ButtonSave from "@/components/common/detail/buttonsave";
import FormDetail from "@/components/common/detail/formdetail";
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
import { useToast } from "@/components/ui/use-toast";
import { PAGINATION, TOAST_MSG } from "@/constant/common-constant";
import { GetKeyState } from "@/interfaces/api";
import { User } from "@/interfaces/user";
import {
  clearGetKey,
  clearPatch,
  clearPost,
  getUser,
  getUserByKey,
  patchUser,
  postUser,
  selectGetKey,
  selectPatch,
  selectPost,
} from "@/lib/redux/slices/userSliceNew";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { errorToast, successToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserDetailProps {
  openDetail: boolean;
  closeDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailUserPage: React.FC<UserDetailProps> = ({
  openDetail,
  closeDetail,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  // fatch
  const responseGet: GetKeyState<User> = useSelector(selectGetKey)!;
  const responsePos: GetKeyState<User> = useSelector(selectPost)!;
  const responsePatch: GetKeyState<User> = useSelector(selectPatch)!;

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState<User | undefined>(undefined);

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

  const onSave = async (values: z.infer<typeof formSchema>) => {
    console.log("onSave ", onSave);
    if (isEdit) {
      dispatch(
        patchUser({
          key: dataDetail?.id!,
          values: {
            id: dataDetail?.id,
            name: values.name,
            username: values.username,
            password: values.password,
          },
        })
      );
    } else {
      dispatch(
        postUser({
          id: undefined,
          name: values.name,
          username: values.username,
          password: values.password,
        })
      );
    }
  };

  useEffect(() => {
    if (responseGet.data) {
      form.setValue("name", responseGet.data.name);
      form.setValue("username", responseGet.data.username);
      dispatch(clearGetKey());
      setDataDetail(responseGet.data);
      setIsEdit(true);
    }
  }, [responseGet.data]);

  // loading after fetch save / update
  useEffect(() => {
    setLoading(responsePos.loading || responsePatch.loading);
  }, [responsePos.loading, responsePatch.loading]);

  // success after save / update
  useEffect(() => {
    if (responsePos.success) {
      successToast({
        toast: toast,
        description: TOAST_MSG.SAVE_SUCCESS_MSG,
      });
      dispatch(clearPost());
      dispatch(getUser({ page: 0, size: PAGINATION.limit }));
    }
    if (responsePatch.success) {
      successToast({
        toast: toast,
        description: TOAST_MSG.UPDATE_SUCCESS_MSG,
      });
      dispatch(clearPatch());
      dispatch(getUser({ page: 0, size: PAGINATION.limit }));
    }
    closeDetail(false);
  }, [responsePos.success, responsePatch.success]);

  // Error after save / update
  useEffect(() => {
    if (responsePos.error)
      errorToast({
        toast: toast,
        description: responsePos.error ?? TOAST_MSG.ERR_MSG,
      });
    if (responsePatch.error)
      errorToast({
        toast: toast,
        description: responsePatch.error ?? TOAST_MSG.ERR_MSG,
      });
  }, [responsePos.error, responsePatch.error]);

  return (
    <FormDetail
      openDetail={openDetail}
      closeDetail={closeDetail}
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
            onClick={() => closeDetail(false)}
          >
            <Undo2 className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
            <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 mx-auto left-8">
              Cancel
            </span>
          </Button>
          <ButtonSave loading={loading} doSave={form.handleSubmit(onSave)} />
        </div>
      </div>
    </FormDetail>
  );
};
export default DetailUserPage;
