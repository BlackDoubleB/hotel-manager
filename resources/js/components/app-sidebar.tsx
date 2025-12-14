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
} from "@/components/ui/sidebar";
import { SidebarProps, PageProps } from "@/types";
import { usePage, Link, router } from "@inertiajs/react";
import { Button } from "./ui/button";

const iconMap: Record<string, LucideIcon> = {
    calendar: Calendar,
    search: Search,
    add: CirclePlus,
    creditcard: CreditCard,
};

export function AppSidebar() {
    const { sidebar } = usePage<SidebarProps>().props;
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar variant="inset" collapsible="icon" className="p-0">
            <SidebarContent className="bg-deep-koamaru-900/90 text-deep-koamaru-50">
                <SidebarGroup className="h-full grid grid-rows-[auto_auto_1fr] ">
                    <SidebarGroupLabel className="font-bold text-deep-koamaru-50">
                        Hotel Manager
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="font-bold text-deep-koamaru-50">
                        Welcome: {auth.user?.name}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
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
                        className="bg-gray-800 w-full self-end cursor-pointer"
                    >
                        Logout
                        <LogIn />
                    </Button>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
