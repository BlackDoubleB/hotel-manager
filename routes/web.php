<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('user/show'); 
});

Route::get('/user', [UserController::class, 'show'])->name('show');

    