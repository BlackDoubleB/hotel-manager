<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::get('/', function () {
    // return Inertia::render('user/show'); 
});

Route::get('/reservation/create', [ReservationController::class, 'add'])->name('reservationCreate')->middleware(['auth']);

Route::get('/reservation/search', [ReservationController::class, 'search'])->name('reservationSearch')->middleware(['auth']);

Route::get('/dateStartTime', [ReservationController::class, 'availabilitystarthours'])->name('reservationSearch')->middleware(['auth']);
Route::get('/dateEndTime', [ReservationController::class, 'availabilityendhours'])->name('reservationSearch')->middleware(['auth']);