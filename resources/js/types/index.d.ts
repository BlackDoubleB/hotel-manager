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


// SD
type Room = {
    id: number;
    room_number: number;
    created_at: string;
    updated_at: string;
};
export type ReservationAddProps = {
    numberRoom: Room[];
};

export type DataHoursStart = {
    hours_start: string[];
};

export type DataHoursEnd = {
    hours_end: string[];
};

export type DataStatusReserv = {
    status_reserv: string[];
};

type StatusPayment = [number, string];
export type DataStatusPayment = {
    status_payment: StatusPayment[];
};

type ItemAmountPayment = [number, number];
export type DataAmountPayment = {
    payment_id: ItemAmountPayment[];
};