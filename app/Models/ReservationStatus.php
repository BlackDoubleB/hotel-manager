<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationStatus extends Model
{
    protected $table = 'reservation_status';
    public function reservation(){
        return $this->hasMany(Reservation::class);
    }
    
}
