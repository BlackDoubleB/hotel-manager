<?php

namespace App\Services;

use App\Models\Reservation;

class AvailabilityService
{


    public function __construct() {}

    public function DateTimesBusy($room_id, $date)
    {
        $reservacion = Reservation::all();
        $room_hours_busy = [];
        foreach ($reservacion as $reserva) {
            if ($reserva->room_id == $room_id && $reserva->reservation_date == $date) {
                $hours = [];
                $hours[] = $reserva->start_time;
                $hours[] = $reserva->end_time;
                $hours[] = $reserva->reservation_date;
                $room_hours_busy[] = $hours;
            }
        }
        return $room_hours_busy;
    }
    public function DateTimesStartAvailable($room_id, $date)
    {
        $hours = [];

        foreach (range(0, 24) as $hour) {
            $hours[] = sprintf("%02d:00:00", $hour);
        }

        $room_time_busy = $this->DateTimesBusy($room_id, $date);


        if (!empty($room_time_busy)) {

            foreach ($hours as $hour) {
                foreach ($room_time_busy as $rtb) {
                    if ($hour == $rtb[0]) {
                        $index_start = array_search($hour, $hours);
                        foreach ($room_time_busy as $rtb) {
                            if ($hour == $rtb[1]) {
                                $index_start = 0;
                                $index_end = 0;
                                $index_end = array_search($hour, $hours);
                                for ($i = $index_start; $i <= $index_end; $i++) {
                                    $hours[$i] = $hours[$i];
                                    $index_start = 0;
                                    $index_end = 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        return $hours;
    }

    public function DateTimesEndAvaible($listHours, $dateStart)
    {
        $newHours = [];
        $ds = preg_replace('/:.*/', '', $dateStart);
        foreach ($listHours as $hour) {
            $h = preg_replace('/:.*/', '', $hour);
            
            if (intval($h) > intval($ds)) {
                if(!in_array($hour,$newHours)){
                    if (in_array($hour, $listHours)) {
                    $numberAddd = (string) ((int) $hour + 1);
                    $hourFormatted = sprintf("%02d:00:00", (int)$numberAddd);
                    $newHours[] = $hour;
                    $newHours[] = $hourFormatted;
                }
                }
                
            }
        }
        return $newHours;
    }
}
