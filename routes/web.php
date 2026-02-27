<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::get('/', function () {
    return redirect('/reservation/create');
});

Route::fallback(function () {
    return redirect('/reservation/create');
})->middleware(['auth']);

Route::get('/reservation/create', [ReservationController::class, 'add'])->name('reservationCreate')->middleware(['auth']);

Route::get('/dateStartTime', [ReservationController::class, 'availabilityStartHours'])->name('reservationCreate')->middleware(['auth']);

Route::get('/dateEndTime', [ReservationController::class, 'availabilityEndHours'])->name('reservationCreate')->middleware(['auth']);

Route::get('/reservation/search', [ReservationController::class, 'search'])->name('reservationSearch')->middleware(['auth']);

Route::get('/reservation/search/{id}', [ReservationController::class, 'searchId'])->name('reservationSearchId')->middleware(['auth']);

Route::post('/registerReservation', [ReservationController::class, 'registerReservation'])->name('reservationCreate')->middleware(['auth']);

Route::patch('/reservations/edit/{id}', [ReservationController::class, 'editreservation'])->name('reservationEdit')->middleware(['auth']);

Route::get('/reservation/searchEdit', [ReservationController::class, 'searchEdit'])->name('reservationSearchEdit')->middleware(['auth']);