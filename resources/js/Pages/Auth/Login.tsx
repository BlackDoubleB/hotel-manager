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

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must have at least 6 characters"),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post("/login", values);
    }

    return (
       <div className="w-full h-screen">
        <div className="flex items-center justify-center h-full">
             <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-deep-koamaru-100/30 p-5 rounded-lg shadow-lg ">
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
                            <FormDescription>
                                Use the email you registered with.
                            </FormDescription>
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
                                    placeholder="••••••••"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Sign In</Button>

                <div className="text-center text-sm font-medium mt-4">
                   Don't have an account?{" "}
                   <Link href="/register" className="text-blue-600 hover:underline">
                       Register here
                   </Link>
                </div>
            </form>
        </Form>
        </div>
       </div>
    );
}
