<?php

namespace App\Services;

use App\Models\PaymentStatus;
use App\Models\Reservation;
use App\Models\ReservationStatus;
use App\Models\User;
use DateTimeImmutable;
use Illuminate\Support\Facades\Log;

class ReservationService
{

    function registerReservation(array $data)
    {
        $reservation = new Reservation();
        $reservation->fill($data);
        if ($reservation->save())
            return ["message" => "successful registration"];
        else return ["message" => "registration faileder"];
    }
    function searchReservation()
    {
        $reservation = Reservation::all()->toArray();

        for ($i = 0; $i < count($reservation); $i++) {
            //user
            $id_user = $reservation[$i]['user_id'];
            $filter_user = User::all()->where('id', $id_user);
            $reservation[$i]['user_id'] = $filter_user[0]["name"];

            //Payment status
            $id_payment = $reservation[$i]['payment_status_id'];
            $filter_payment = PaymentStatus::all()->where('id', $id_payment);
            $reservation[$i]['payment_status_id'] = $filter_payment[0]["payment_status"];

            //reservation status
            $id_reservation_status = $reservation[$i]['reservation_status_id'];
            $filter_reservation_status = ReservationStatus::all()->where('id', $id_reservation_status);
            $reservation[$i]['reservation_status_id'] = $filter_reservation_status[0]["reservation_status"];
        }

        return $reservation;
    }
}
