<?php

namespace App\Http\Controllers;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function Add(){
        return Inertia::render('admin/reservationAdd');
    }
     public function Search(){
        return Inertia::render('reservationSearch');
    }
}
