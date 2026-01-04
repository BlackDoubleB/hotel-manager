<?php

namespace App\Services;

use App\Models\Reservation;
use DateTimeImmutable;

class ReservationService
{
    function registerReservation(array $data)
    {
        $reservation = new Reservation();
        $reservation->fill($data);
        if ($reservation->save())
            return ["message" => "successful registration"];
        else return ["message" => "registration faileder"];
        // El metodo all es estatico :: y se llaman desde la clase que lo define o cualquier clase que lo herede, no solo desde la “original”. 
    }
}
