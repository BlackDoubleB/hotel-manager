<?php

namespace App\Http\Controllers;

use App\Services\HoursService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\RoomData;
class ReservationController extends Controller
{
    public function Add(RoomData $rd){
        $data = $rd->RoomNumber();
        return Inertia::render('admin/reservationAdd', ['numberRoom' => $data]);
    }
     public function Search(){
        return Inertia::render('reservationSearch');
    }

    public function AvailabilityStartHours(Request $rq, HoursService $h){
        $roomId = (int) $rq->query('room');
        $dateTime = $rq->query('date');
        $hoursAvailability = $h->DateTimesStartAvailable($roomId, $dateTime);
        return response()->json([
            'hours_start' => $hoursAvailability
        ]);
        
    }               
    public function AvailabilityEndHours(Request $rq, HoursService $h){
        $listHours =  $rq->query('listHoursStart');
        $dateStart = $rq->query('hourStartSelected');
        $hoursAvailability = $h->DateTimesEndAvaible($listHours, $dateStart);
        return response()->json([
            'hours_end' => $hoursAvailability
        ]);
    }
}