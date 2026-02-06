<?php
declare(strict_types=1);
namespace App\Services;

use App\Models\PaymentStatus;
use App\Models\Reservation;
use App\Models\ReservationStatus;
use App\Models\User;
use DateTimeImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Builder;


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

    function searchReservation(Request $rq)
    {
        //obtener el query param del rq
        $query_param = $rq->query('reservation_status');
        $reservation = Reservation::with(['user', 'payment', 'payment_status', 'reservation_status', 'room'])->when($query_param, function (Builder $q) use ($query_param){
            $q->whereHas('reservation_status', function (Builder $query) use ($query_param) {
            $query->where('reservation_status', $query_param);
        });
        })->paginate(2);
        
        $reservation->getCollection()->transform(function ($data) {
            return [
                //REASIGNAMOS TODO EL VALOR DE DATA
                'id' => $data->id,
                'user_id' => $data->user_id,
                'payment_id' => $data->payment_id,
                'payment_status_id' => $data->payment_status_id,
                'reservation_status_id' => $data->reservation_status_id,
                'room_id' =>  $data->room_id,
                'start_time' => $data->start_time,
                'end_time' => $data->end_time,
                'customer' => $data->customer,
                'reservation_date' => $data->reservation_date,

                'user_name' =>  $data->user?->name,
                'payment_amount' => $data->payment?->amount,
                'payment_status' =>  $data->payment_status?->payment_status,
                'reservation_status' => $data->reservation_status?->reservation_status,
                'room' => $data->room?->room_number,
            ];
        });
        //retornas el sreservation modificado
        return $reservation;
    }

    function searchReservationId($id){
         //obtener el query param del rq
        $reservation = Reservation::with(['user', 'payment', 'payment_status', 'reservation_status', 'room'])->when($id, function (Builder $q) use ($id){
            $q->where('id', $id);
        })->get();
        
        $reservation->transform(function ($data) {
            return [
                //REASIGNAMOS TODO EL VALOR DE DATA
                'id' => $data->id,
                'user_id' => $data->user_id,
                'payment_id' => $data->payment_id,
                'payment_status_id' => $data->payment_status_id,
                'reservation_status_id' => $data->reservation_status_id,
                'room_id' =>  $data->room_id,
                'start_time' => $data->start_time,
                'end_time' => $data->end_time,
                'customer' => $data->customer,
                'reservation_date' => $data->reservation_date,

                'user_name' =>  $data->user?->name,
                'payment_amount' => $data->payment?->amount,
                'payment_status' =>  $data->payment_status?->payment_status,
                'reservation_status' => $data->reservation_status?->reservation_status,
                'room' => $data->room?->room_number,
            ];
        });

        //retornas el sreservation modificado
        return $reservation;
    }
}
