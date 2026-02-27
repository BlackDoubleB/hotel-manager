import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Head } from "@inertiajs/react";
import React from "react";


interface MainLayoutProps {
    title?: string;
    children: React.ReactNode;
}

export default function MainLayout({ title, children }: MainLayoutProps) {

    return (
        <>
            <Head title={title} />
            <SidebarProvider >
                <AppSidebar />
                <main className="w-full min-h-screen bg-zinc-50 py-10">
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}
