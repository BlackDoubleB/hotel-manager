<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ReservationController;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('user/show'); 
});

Route::get('/reservation/create', [ReservationController::class, 'add'])->name('reservationCreate');
Route::get('/reservation/search', [ReservationController::class, 'search'])->name('reservationSearch');

// Auth
// Route::get('/login', [LoginController::class, 'show'])->name('login');
// Route::post('/login', [LoginController::class, 'store'])->name('login.store');