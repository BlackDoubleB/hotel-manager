<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $table = 'reservation';
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

    
    
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function reservation_status(): BelongsTo{
        return $this->belongsTo(ReservationStatus::class);
    }

    public function payment(): BelongsTo{
        return $this->belongsTo(Payment::class);
    }

    public function room(): BelongsTo{
        return $this->belongsTo(Room::class);
    }

    public function payment_status(): BelongsTo{
        return $this->belongsTo(PaymentStatus::class);
    }
}
