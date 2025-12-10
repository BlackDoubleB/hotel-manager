<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use App\Providers\AppServiceProvider;

class LoginController extends Controller
{
    public function Show()
    {
        return Inertia::render('Auth/Login');
    }
     public function Store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(AppServiceProvider::HOME);
    }
}
