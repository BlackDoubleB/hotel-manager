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
    function searchReservation(Request $request)
    {
        $reservation = Reservation::paginate(2)->toArray();
        // $reservation = Reservation::all()->toArray();
        for ($i = 0; $i < count($reservation['data']); $i++) {
            //user
            $id_user = $reservation['data'][$i]['user_id'];
            $filter_user = User::all()->where('id', $id_user);
            $reservation['data'][$i]['user_id'] = $filter_user[0]["name"];

            //Payment status

            //consulta de los registros, la data, el bloque index actual y obtiene el valor de payment status id
            $id_payment = $reservation['data'][$i]['payment_status_id'];
            $filter_payment = PaymentStatus::all()->where('id', $id_payment);
            $reservation['data'][$i]['payment_status_id'] = $filter_payment[0]["payment_status"] ?? null;

            //reservation status
            $id_reservation_status = $reservation['data'][$i]['reservation_status_id'];
            $filter_reservation_status = ReservationStatus::all()->where('id', $id_reservation_status);
            $reservation['data'][$i]['reservation_status_id'] = $filter_reservation_status[0]["reservation_status"];
        }

        return $reservation['data'];
    }
}

// sd
// [
//     "current_page" => 1,
//     "data" => [
//       [
//         "id" => 15,
//         "payment_status_id" => 3,
//         "payment_id" => 1,
//         "user_id" => 1,
//         "reservation_status_id" => 3,
//         "room_id" => 2,
//         "customer" => "Osita",
//         "reservation_date" => "2026-01-05",
//         "start_time" => "23:00:00",
//         "end_time" => "23:59:59",
//         "created_at" => "2026-01-06T03:29:45.000000Z",
//         "updated_at" => "2026-01-06T03:29:45.000000Z",
//       ],
//       [
//         "id" => 16,
//         "payment_status_id" => 3,
//         "payment_id" => 1,
//         "user_id" => 1,
//         "reservation_status_id" => 3,
//         "room_id" => 2,
//         "customer" => "Osita",
//         "reservation_date" => "2026-01-05",
//         "start_time" => "23:00:00",
//         "end_time" => "23:59:59",
//         "created_at" => "2026-01-06T03:29:52.000000Z",
//         "updated_at" => "2026-01-06T03:29:52.000000Z",
//       ],
//     ],
//     "first_page_url" => "http://localhost:8000?page=1",
//     "from" => 1,
//     "last_page" => 4,
//     "last_page_url" => "http://localhost:8000?page=4",
//     "links" => [
//       [
//         "url" => null,
//         "label" => "&laquo; Previous",
//         "page" => null,
//         "active" => false,
//       ],
//       [
//         "url" => "http://localhost:8000?page=1",
//         "label" => "1",
//         "page" => 1,
//         "active" => true,
//       ],
//       [
//         "url" => "http://localhost:8000?page=2",
//         "label" => "2",
//         "page" => 2,
//         "active" => false,
//       ],
//       [
//         "url" => "http://localhost:8000?page=3",
//         "label" => "3",
//         "page" => 3,
//         "active" => false,
//       ],
//       [
//         "url" => "http://localhost:8000?page=4",
//         "label" => "4",
//         "page" => 4,
//         "active" => false,
//       ],
//       [
//         "url" => "http://localhost:8000?page=2",
//         "label" => "Next &raquo;",
//         "page" => 2,
//         "active" => false,
//       ],
//     ],
//     "next_page_url" => "http://localhost:8000?page=2",
//     "path" => "http://localhost:8000",
//     "per_page" => 2,
//     "prev_page_url" => null,
//     "to" => 2,
//     "total" => 7,
//   ]