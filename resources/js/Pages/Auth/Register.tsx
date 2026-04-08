import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Link, router } from "@inertiajs/react";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must have at least 6 characters"),
    password_confirmation: z
      .string()
      .min(6, "Confirmation must have at least 6 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
});

function onSubmit(values: z.infer<typeof formSchema>) {
  router.post("/register", {
    name: values.name,
    email: values.email,
    password: values.password,
    password_confirmation: values.password_confirmation,
  });
}
    return (
      <div className="w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-deep-koamaru-100/30 p-5 rounded-lg shadow-lg "
          >
            {}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="youremail@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Register</Button>

            <div className="text-center text-sm font-medium mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Sign In here
                </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
    );
}
