<?php

namespace App\Services;

use App\Models\PaymentStatus;
use App\Models\Reservation;
use App\Models\ReservationStatus;
use App\Models\User;
use DateTimeImmutable;
use Illuminate\Http\Request;
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
        // $reservation = Reservation::paginate(2)->toArray();
        $reservation = Reservation::with('user', 'payment_status', 'reservation_status')->paginate(2);

        // for ($i = 0; $i < count($reservation['data']); $i++) {
        //     //user
        //     $id_user = $reservation['data'][$i]['user_id'];
        //     $filter_user = User::firstWhere('id', $id_user);
        //     $reservation['data'][$i]['user_id'] = $filter_user["name"];

        //    //  Payment status
        //    $id_payment = $reservation['data'][$i]['payment_status_id'];
        //    $filter_payment = PaymentStatus::firstWhere('id', $id_payment);
        //    $reservation['data'][$i]['payment_status_id'] = $filter_payment["payment_status"] ?? null;

        //     //reservation status
        //     $id_reservation_status = $reservation['data'][$i]['reservation_status_id'];
        //     $filter_reservation_status = ReservationStatus::firstWhere('id', $id_reservation_status);
        //     $reservation['data'][$i]['reservation_status_id'] = $filter_reservation_status["reservation_status"];
        // }
     
        // return $reservation['data'];
        return $reservation;
       
    }
}

