<?php
declare(strict_types=1);
namespace App\Services;

use App\Models\PaymentStatus;

class PaymentStatusService
{
    function PaymentStatus()
    {
        $data = PaymentStatus::All();
        $paymentStatus = [];
        
        foreach($data as $d){
            $dataD = [];
            $dataD[] = $d->id;
            $dataD[] = $d->payment_status; 
            $paymentStatus[] = $dataD;
        }
        return $paymentStatus;

    }
}
