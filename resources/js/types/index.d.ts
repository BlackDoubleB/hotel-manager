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

type AmountItem = {
    price: number;
};

export type AmountProps = {
    amount: AmountItem[];
};

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

export type PagePropsAuth = {
    sidebar: SidebarItem[];
};

export type dataReservation = {
    id: number;
    user_id: number;
    payment_id: number;
    payment_status_id: number;
    reservation_status_id: number;
    room_id: number;
    customer: string;
    reservation_date: string;
    start_time: string;
    end_time: string;
    user_name: string;
    payment_amount: number;
    payment_status: string;
    reservation_status: string;
    room_number: number;
};
export type ReservationProps = {
    reservationsData: {
        data: dataReservation[];
        last_page: number;
        current_page: number;
    };
};
export type ReservationPropsSearchId = {
    reservationDataId: dataReservation[];
};
export type reservationColumnsHeader = {
    key: string;
    label: string;
};
export type dataReservationEdit = {
    payment_status?: string;
    reservation_status?: string;
};


export type dataReservationEditArray = {
    reservationDataEditArray: {
        paymentStatus: { id: string, payment_status: string }[],
        reservationStatus: { id: string, reservation_status: string }[]
    }
};