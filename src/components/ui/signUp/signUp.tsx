"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../passwordInput";
import { SignUpForm } from "@/types/index";
import { z } from "zod";
import { signUp } from "@/app/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpForm>>({
    resolver: zodResolver(SignUpForm),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpForm>) {
    const res = await signUp(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully.",
      });
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-2 border-gray-500 p-12 rounded-t-xl shadow-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="username"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="email"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email.</FormDescription>
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
                  <PasswordInput
                    placeholder="********"
                    className="text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confrim Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    className="text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Confirm your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-red-400 rounded-xl hover:-translate-y-1"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
