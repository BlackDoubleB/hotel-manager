<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
     protected $table = 'Room';

     public function reservation(){
        return $this->hasMany(Reservation::class);
    }
}
