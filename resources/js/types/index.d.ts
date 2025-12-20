import { number } from "zod";

//menu items
type SidebarItem = {
    label: string;
    route: string;
    icon: string;
    roles: string[];
};

type SidebarProps = {
    sidebar: SidebarItem[];
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type AmountItem ={
  price : number
}

export type AmountProps = {
  amount : AmountItem[]; 
}

export type AuthProps = {
  user: AuthUser | null;
};

export type PageProps = SidebarProps & {
  auth: AuthProps;
};

