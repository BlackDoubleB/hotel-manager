<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ReservationStatus;

class ReservationStatusService
{
    function ReservStatus(): array
    {
        $dataStatus = ReservationStatus::All();
        $status = [];

        if ($dataStatus) {
            foreach ($dataStatus as $data) {
                $dataItem = [];
                $dataItem[] = $data->id;
                $dataItem[] = $data->reservation_status;
                $status[] = $dataItem;
            }
        }
        return $status;
    }
}
