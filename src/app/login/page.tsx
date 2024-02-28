"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login({}) {
  const router = useRouter();
  const [process, setProcess] = useState(false);

  const formSchema = z.object({
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
      username: "",
      password: "",
    },
  });

  async function onLogin(values: z.infer<typeof formSchema>) {
    router.push("/");
  }

  const handlerLogin = (values: z.infer<typeof formSchema>) => {
    setProcess(!process);
    setTimeout(() => {
      onLogin(values);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen h-screen w-screen">
      <div className="w-full h-screen"></div>
      <div className="flex flex-col justify-center items-center w-1/2 h-full shadow-md border space-y-4">
        <span>LOGIN</span>
        <div className="w-full px-16">
          <Form {...form}>
            <form className="flex flex-col space-y-4">
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
                        type="password"
                        {...field}
                        className="text-primary bg-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="inline-flex justify-end">
                <Button
                  className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
                  aria-disabled={process}
                  disabled={process}
                  onClick={form.handleSubmit(handlerLogin)}
                >
                  {process ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <LogInIcon className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
                      <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Login
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
