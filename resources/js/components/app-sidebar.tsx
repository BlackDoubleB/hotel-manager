import {
    Calendar,
    Home,
    CirclePlus,
    LucideIcon,
    Search,
    CreditCard,
    LogIn,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarProps, PageProps } from "@/types";
import { usePage, Link, router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
    calendar: Calendar,
    search: Search,
    add: CirclePlus,
    creditcard: CreditCard,
};

export function AppSidebar() {
    const { sidebar } = usePage<SidebarProps>().props;
    const { auth } = usePage<PageProps>().props;
    const [open, setOpen] = useState(true);

    return (
        <Sidebar variant="inset" collapsible="icon" className="p-0">
            <SidebarContent className="bg-zinc-950 text-zinc-300 border-r border-zinc-800">
                <SidebarGroup className="h-full grid grid-rows-[auto_auto_1fr] ">
                    <SidebarGroupLabel className="font-bold text-zinc-100 text-lg py-4">
                        Hotel Manager
                        {open && <SidebarTrigger className="absolute flex items-center justify-center right-5 cursor-pointer" onClick={() => setOpen(false)} />}
                    </SidebarGroupLabel>



                    <SidebarGroupLabel className="font-medium text-zinc-400 mb-6">
                        Welcome: {auth.user?.name}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {!open && <SidebarTrigger className="px-4 cursor-pointer"  onClick={() => setOpen(true)}/>}
                            {sidebar.map((item) => {
                                const Icon = iconMap[item.icon] ?? Home;

                                return (
                                    <SidebarMenuItem key={item.label}>

                                        <SidebarMenuButton asChild>

                                            <Link href={item.route}>
                                                <Icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>

                                        {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <Button
                        onClick={() => router.post("/logout")}
                        variant="outline"
                        size="icon"
                        aria-label="Submit"
                        className="text-zinc-800  w-full self-end cursor-pointer"
                    >
                        Logout
                        <LogIn />
                    </Button>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
