import { Calendar, Home, CirclePlus , LucideIcon, Search, CreditCard } from "lucide-react"

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
} from "@/components/ui/sidebar"

import { usePage, Link  } from "@inertiajs/react";
// Menu items.
type SidebarItem = {
  label: string;
  route: string;
  icon: string;
  roles: string[];
};

type InertiaProps = {
  sidebar: SidebarItem[];
};

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  search: Search,
  add: CirclePlus,
  creditcard: CreditCard,
};

export function AppSidebar() {
const { sidebar } = usePage<InertiaProps>().props;
  
  return (
    <Sidebar variant="inset" collapsible="icon" className="p-0" >
      <SidebarContent className="bg-deep-koamaru-900/90 text-deep-koamaru-50">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-deep-koamaru-50">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebar.map((item) => {
                const Icon = iconMap[item.icon] ?? Home

                return (
                  <SidebarMenuItem key={item.route}>
                    <SidebarMenuButton asChild>
                    <Link href={item.label}>
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
        </SidebarGroup>
      </SidebarContent>
      
    </Sidebar>
  )
}