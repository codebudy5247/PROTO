"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { LoginSchema } from "@/schemas/auth";
import useAuthStore from "@/hooks/useAuth";

const SigninForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const updateUser = useAuthStore((state) => state.updateUser);

  // const from = localStorage.getItem("PreviousLoc")! || "/"

  const { mutate: loginFn } = api.auth.login.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: (data) => {
      toast.success("Login successfully");
      updateUser(data.user);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    loginFn(values);
  };

  return (
    <>
      <h1 className="mb-5 text-center text-2xl font-extrabold">LOGIN</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={submitting} className="mt-6 w-full" type="submit">
            Sign in
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SigninForm;
