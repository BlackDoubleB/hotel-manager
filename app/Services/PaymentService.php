<?php

namespace App\Services;

use App\Models\Payment;

class PaymentService
{
    function Payment()
    {
        $data = Payment::All();
        $amounts = [];

        foreach ($data as $d) {
            $amount = [];
            $amount[] = $d->id;
            $amount[] = $d->amount;
            $amounts[] = $amount;
        }

        return $amounts;
    }
}
