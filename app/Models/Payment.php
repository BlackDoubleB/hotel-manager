<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payment';

    public function reservation(){
        return $this->hasMany(Reservation::class);
    }
}
