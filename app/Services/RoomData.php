<?php
namespace App\Services;

use App\Models\Room;

class RoomData{

    public function RoomNumber(){
        return Room::all();
    }

}