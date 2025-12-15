<?php

namespace App\Http\Controllers;

use App\Services\AvailabilityService;
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

    public function AvailabilityHours(Request $rq, AvailabilityService $as){
        $roomId = (int) $rq->query('room');
        $dateTime = $rq->query('date');
        $hoursAvailability = $as->DateTimesAvailable($roomId, $dateTime);
        return response()->json([
            'hours' => $hoursAvailability
        ]);
        
    }
    
    
}
