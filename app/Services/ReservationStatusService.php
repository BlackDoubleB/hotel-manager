<?php

namespace App\Services;
use App\Models\ReservationStatus;

Class ReservationStatusService{
    function ReservStatus(){
        $dataStatus = ReservationStatus::All();
        $status = [];
        
        foreach($dataStatus as $data){
            $dataItem = [];
            $dataItem[]=$data->id;
            $dataItem[]=$data->reservation_status;
            $status[] = $dataItem;
        }
        return $status;
    }
}