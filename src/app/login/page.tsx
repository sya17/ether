// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LogInIcon } from "lucide-react";
// // import { useRouter } from "next/navigation";

// export default function page(params: {}) {
//   const formSchema = z.object({
//     username: z.string().min(1, {
//       message: "Username must be field.",
//     }),
//     password: z.string().min(1, {
//       message: "Password must be field.",
//     }),
//   });
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     // const router = useRouter();
//     // router.push("/");
//   }

//   return (
//     <div className="w-screen min-h-screen flex flex-row">
//       <div className="w-full min-h-full  flex items-center justify-center bg-accent">
//         {/* <img
//           src="https://picsum.photos/id/200/300"
//           className="block object-cover h-full w-full"
//           alt="Placeholder Image"
//         /> */}
//       </div>
//       <div className="flex flex-col w-2/3 min-h-full bg-background items-center justify-center text-primary shadow-lg">
//         <div>Company Logo</div>
//         <div className="w-full p-2 px-20">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="shadcn"
//                         {...field}
//                         className="text-primary bg-input"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="password"
//                         type="password"
//                         {...field}
//                         className="text-primary bg-input"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 type="submit"
//                 className="w-full inline-flex space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90"
//               >
//                 <span>Login</span>
//                 <LogInIcon />
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }
