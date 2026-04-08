<?php

use App\Http\Controllers\CiudadController;
use App\Http\Controllers\PlaceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::get('/', function () {
    return redirect()->route('reservations.create');
});

Route::fallback(function () {
    return redirect()->route('reservations.create');
})->middleware(['auth']);

Route::middleware(['auth'])->group(function () {
    // RESTful endpoints for reservations
    Route::get('/reservations', [ReservationController::class, 'search'])->name('reservations.index');
    Route::get('/reservations/create', [ReservationController::class, 'add'])->name('reservations.create');
    Route::get('/reservations/places', [PlaceController::class, 'places'])->name('reservations.places');
    Route::post('/reservations', [ReservationController::class, 'registerReservation'])->name('reservations.store');
    Route::get('/reservations/{reservation}', [ReservationController::class, 'searchId'])->name('reservations.show');
    Route::patch('/reservations/{reservation}', [ReservationController::class, 'editreservation'])->name('reservations.update');

    // Support endpoints for UI (fetching options, etc.)
    Route::get('/api/reservations/edit-options', [ReservationController::class, 'searchEdit'])->name('reservations.edit');
    Route::get('/api/reservations/availability/start-time', [ReservationController::class, 'availabilityStartHours'])->name('reservations.availability.start');
    Route::get('/api/reservations/availability/end-time', [ReservationController::class, 'availabilityEndHours'])->name('reservations.availability.end');
    //responde a consultas con fetch
    Route::get('/api/places-info', [PlaceController::class, 'searchPlace'])->name('api.places.search');
});