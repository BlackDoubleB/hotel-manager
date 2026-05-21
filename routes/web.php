<?php

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
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/create', [ReservationController::class, 'create'])->name('reservations.create');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
    Route::get('/reservations/{id}', [ReservationController::class, 'show'])->name('reservations.show');
    Route::patch('/reservations/{id}', [ReservationController::class, 'update'])->name('reservations.update');

     // Endpoints for UI (fetching)
    Route::get('/api/reservations/edit-options', [ReservationController::class, 'editOptions'])->name('reservations.edit-options');
    Route::get('/api/reservations/availability/start-times', [ReservationController::class, 'availabilityStartHours'])->name('reservations.availability.start-times');
    Route::get('/api/reservations/availability/end-times', [ReservationController::class, 'availabilityEndHours'])->name('reservations.availability.end-times');
});