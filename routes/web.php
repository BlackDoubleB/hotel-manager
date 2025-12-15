<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ReservationController;
use Inertia\Inertia;
use App\Services\AvailabilityService;
Route::get('/', function () {
    // return Inertia::render('user/show'); 
});

Route::get('/reservation/create', [ReservationController::class, 'add'])->name('reservationCreate')->middleware(['auth']);

Route::get('/reservation/search', [ReservationController::class, 'search'])->name('reservationSearch')->middleware(['auth']);

Route::get('/datetime', [ReservationController::class, 'availabilityHours'])->name('reservationSearch')->middleware(['auth']);