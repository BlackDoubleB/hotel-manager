<?php
declare(strict_types=1);
namespace App\Services;

use App\Models\Reservation;
use Illuminate\Support\Facades\Log;

class HoursService
{
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
    public function getNumberSeconds($time)
    {
        $hour = intval(substr($time, 0, 2));
        $minute = intval(substr($time, 3, 2));
        $seconds = intval(substr($time, 3, 2));
        //pasando a segundos
        $h = $hour * 60 * 60;
        $m = $minute * 60;
        return $h + $m + $seconds;
    }

    public function DateTimesStartAvailable($room_id, $date)
    {
        date_default_timezone_set('America/Lima');
        $date_mod = substr(str_replace('-', '/', substr($date, 0, 10)), -8);
        $hours = []; 
       
        $hours_time_busy = $this->DateTimesBusy($room_id, $date);

        for ($hour = 0; $hour <= 47; $hour++) {

            if ($hour <= 23) {
                $hours[] = sprintf("%02d:00:00", $hour);
            } else {
                $hours[] = sprintf("%02d:59:59", $hour - 24);
            }
        }

        //si no esta vacio las horas ocupados
        if (count($hours_time_busy) > 0) {
            $rangebussy = [];

            foreach ($hours_time_busy as $rtb) {
                $value_start_bussy = $rtb[0];
                $value_end_bussy = $rtb[1];

                foreach ($hours as $h) {
                    if ($this->getNumberSeconds($h) >= $this->getNumberSeconds($value_start_bussy) && $this->getNumberSeconds($h) <= $this->getNumberSeconds($value_end_bussy)) {
                        $rangebussy[] = $h;
                    }
                }
            }

            if ($rangebussy) {
                $hours = array_diff($hours, $rangebussy);
            }
        }

        if ($date_mod == date("y/m/d")) {
            $hours = array_values(array_filter($hours, function ($h) {
                return substr($h, -2) !== '59' && (intval(substr($h, 0, 2)) > intval(substr(date("H:i:s"), 0, 2)));
            }));
        } else {
            $hours = array_values(array_filter($hours, function ($h) {
                return substr($h, -2) !== '59';
            }));
        }

        return $hours;
    }

    public function DateTimesEndAvaible($listHours, $hourStart)
    {
        //horas fin disponibles
        $newHours = [];

        //recorriendo lista de horas inicio disponibles
        foreach ($listHours as $hour) {
            if ($hour >= $hourStart)
                $newHours[] = substr($hour, 0, 2) . ':59:59';
        }
        return array_values(array_unique($newHours));
    }
}
