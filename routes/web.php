<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::get('/', function () {
    return redirect('/reservation/create');
});

Route::get('/reservation/create', [ReservationController::class, 'add'])->name('reservationCreate')->middleware(['auth']);

Route::get('/dateStartTime', [ReservationController::class, 'availabilitystarthours'])->name('reservationCreate')->middleware(['auth']);

Route::get('/dateEndTime', [ReservationController::class, 'availabilityendhours'])->name('reservationCreate')->middleware(['auth']);

Route::get('/reservation/search', [ReservationController::class, 'search'])->name('reservationSearch')->middleware(['auth']);

Route::post('/registerReservation', [ReservationController::class, 'registerreservation'])->name('reservationCreate')->middleware(['auth']);