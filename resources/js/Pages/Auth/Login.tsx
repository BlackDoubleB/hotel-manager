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
import { router } from "@inertiajs/react";

const formSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
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
        console.log(values);
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
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="tucorreo@ejemplo.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Usa el correo con el que te registraste.
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
                            <FormLabel>Contraseña</FormLabel>
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

                <Button type="submit">Iniciar sesión</Button>
            </form>
        </Form>
        </div>
       </div>
    );
}
