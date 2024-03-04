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
import { Company } from "@/interfaces/company";
import {
  clearGetKey,
  clearPatch,
  clearPost,
  getCompany,
  getCompanyByKey,
  patchCompany,
  postCompany,
  selectGetKey,
  selectPatch,
  selectPost,
} from "@/lib/redux/slices/companySliceNew";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { errorToast, successToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CompanyDetailProps {
  openDetail: boolean;
  openCloseDetail: (val: boolean) => void;
  dataKey: {
    id?: number;
  };
}

const DetailCompanyPage: React.FC<CompanyDetailProps> = ({
  openDetail,
  openCloseDetail,
  dataKey,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  // fatch
  const responseGet: GetKeyState<Company> = useSelector(selectGetKey)!;
  const responsePos: GetKeyState<Company> = useSelector(selectPost)!;
  const responsePatch: GetKeyState<Company> = useSelector(selectPatch)!;

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: "Min 5 Character",
      })
      .nonempty("Name must be field."),
    publicKey: z
      .string()
      .min(5, {
        message: "Min 5 Character",
      })
      .nonempty("PublicKey must be field."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const doClose = () => {
    openCloseDetail(false);
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    console.log("onSave ", onSave);

    if (dataKey && dataKey.id) {
      dispatch(
        patchCompany({
          key: dataKey.id,
          values: {
            id: dataKey.id,
            name: values.name,
            publicKey: values.publicKey,
          },
        })
      );
    } else {
      dispatch(
        postCompany({
          id: undefined,
          name: values.name,
          publicKey: values.publicKey,
        })
      );
    }
  };

  useEffect(() => {
    form.reset();
    console.log("dataKey ", dataKey);
    if (dataKey && dataKey.id) {
      dispatch(getCompanyByKey(dataKey.id));
    }
  }, [dataKey]);

  useEffect(() => {
    if (responseGet.data) {
      form.setValue("name", responseGet.data.publicKey!);
      form.setValue("publicKey", responseGet.data.publicKey!);
      dispatch(clearGetKey());
    }
  }, [responseGet.data]);

  useEffect(() => {
    setLoading(responsePos.loading || responsePatch.loading);
  }, [responsePos.loading, responsePatch.loading]);

  useEffect(() => {
    if (responsePos.success) {
      successToast({
        toast: toast,
        description: TOAST_MSG.SAVE_SUCCESS_MSG,
      });
      dispatch(clearPost());
      dispatch(getCompany({ page: 0, size: PAGINATION.limit }));
    }
    if (responsePatch.success) {
      successToast({
        toast: toast,
        description: TOAST_MSG.UPDATE_SUCCESS_MSG,
      });
      dispatch(clearPatch());
      dispatch(getCompany({ page: 0, size: PAGINATION.limit }));
    }
    doClose();
  }, [responsePos.success, responsePatch.success]);

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
      openCloseDetail={openCloseDetail}
      title="Company"
      desc="Masterdata of Company"
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
          <ButtonSave loading={loading} doSave={form.handleSubmit(onSave)} />
        </div>
      </div>
    </FormDetail>
  );
};
export default DetailCompanyPage;
