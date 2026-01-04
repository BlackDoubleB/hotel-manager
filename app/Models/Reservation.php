<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
   protected $table = 'Reservation';
    protected $fillable = [
        'user_id',
        'room_id',
        'payment_id',
        'payment_status_id',
        'reservation_status_id',
        'customer',
        'reservation_date',
        'start_time',
        'end_time',
    ];
}
