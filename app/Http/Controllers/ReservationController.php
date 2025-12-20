<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use App\Services\HoursService;
use App\Services\PaymentStatusService;
use App\Services\ReservationStatusService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\RoomData;

class ReservationController extends Controller
{
    public function Add(RoomData $rd, ReservationStatusService $rs, PaymentStatusService $ps, PaymentService $psa)
    {
        $data = $rd->RoomNumber();
        $dataStatus = $rs->ReservStatus();
        $dataPaymenStatus = $ps->PaymentStatus();
        $dataPaymentAmount= $psa->Payment();
        return Inertia::render('admin/reservationAdd', 
        ['numberRoom' => $data, 'status_reserv' => $dataStatus, 'status_payment'=> $dataPaymenStatus, 'amount_payment'=> $dataPaymentAmount]);
    }
    public function Search()
    {
        return Inertia::render('reservationSearch');
    }

    public function AvailabilityStartHours(Request $rq, HoursService $h)
    {
        $roomId = (int) $rq->query('room');
        $dateTime = $rq->query('date');
        $hoursAvailability = $h->DateTimesStartAvailable($roomId, $dateTime);
        return response()->json([
            'hours_start' => $hoursAvailability
        ]);
    }
    public function AvailabilityEndHours(Request $rq, HoursService $h)
    {
        $listHours =  $rq->query('listHoursStart');
        $dateStart = $rq->query('hourStartSelected');
        $hoursAvailability = $h->DateTimesEndAvaible($listHours, $dateStart);
        return response()->json([
            'hours_end' => $hoursAvailability
        ]);
    }

}
