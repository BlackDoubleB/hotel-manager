<?php

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
         foreach ($room_hours_busy as $item) {
            foreach($item as $i){
                 Log::info('HORA ' . $i);
            }
            Log::info('------');
           
}

        return $room_hours_busy;
    }
    public function DateTimesStartAvailable($room_id, $date)
    {
        date_default_timezone_set('America/Lima');
        $date_mod = substr(str_replace('-', '/', substr($date, 0, 10)), -8);
        Log::info('date cliente' . $date_mod);
        Log::info('date sisitema' . date("y/m/d"));
        $hours = []; //TODAS LAS HORAS DISPONIBLES 
        $hoursStartBussy = [];
        $room_time_busy = $this->DateTimesBusy($room_id, $date);
       
        for ($hour = 0; $hour <= 47; $hour++) {

            if ($hour <= 23) {
                $hours[] = sprintf("%02d:00:00", $hour);
            } else {
                $hours[] = sprintf("%02d:59:59", $hour - 24);
            }
        }
        
        //si no esta vacio las horas ocupados
        if (count($room_time_busy)>0) {
            //recorremos todas las horas ocupadas

            foreach ($room_time_busy as $rtb) {

                //obtenemos indice de la hora ocupada de inicio  en el de todas 
                $index_start = array_search($rtb[0], $hours, true);
                $index_end = array_search($rtb[1], $hours, true);

                //recorremos desde el indice de inicio y el indice de fin
                for ($i = $index_start; $i <= $index_end; $i++) {
                    //tomamos de todas horas las horas de los rangos y las ponemos en las de start
                    $hoursStartBussy[] = $hours[$i];
                }

                // $index_start = $rtb[0];
                // $index_end = $rtb[1];
                // $toSeconds = fn($t) => strtotime($t) - strtotime('00:00:00');
                // foreach($hours as $hour){
                //     if($toSeconds($hour)<$toSeconds($index_start) && $toSeconds($hours)>$toSeconds($index_end)){
                //         $hoursStartBussy[] =  $hour;
                //     }
                // }
                
            }
         
          
            
            //devuelve el array con horas que no estan ocupadas
            $hoursStarAvaible = array_values(array_diff($hours, $hoursStartBussy));
            $hoursStarAvaibleFilter = array_values(array_filter($hoursStarAvaible, function ($hsa) {

                return substr($hsa, -2) !== '59' && (intval(substr($hsa, 0, 2)) > intval(substr(date("H:i:s"), 0, 2)));
            }));

            return $hoursStarAvaibleFilter;
        }
        
        if ($date_mod == date("y/m/d")) {
            Log::info(':)');
            $hours = array_values(array_filter($hours, function ($h) {
                return substr($h, -2) !== '59' && (intval(substr($h, 0, 2)) > intval(substr(date("H:i:s"), 0, 2)));
            }));
        } else {
            Log::info(':(');
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
