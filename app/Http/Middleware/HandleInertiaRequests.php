<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

// En Inertia, HandleInertiaRequests casi siempre se usa para modificar la response, no la request, porque agrega datos que React recibirá como props.
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ] : null,
            ],
            'sidebar' => config('sidebar'),
            'csrf_token' => csrf_token(),
        ];
    }
}


//EN ARHIVOS COMO ESTOS ES DONDE SE RECOMIENDA CREAR LOS MIDDLEWARE
// 1. Crear el middleware
// php artisan make:middleware CheckSubscription

// 2. Se crea en: app/Http/Middleware/CheckSubscription.php
// namespace App\Http\Middleware;
// class CheckSubscription
// {
//     public function handle($request, Closure $next)
//     {
//         if (!auth()->user()->isSubscribed()) {
//             return redirect('/pricing');
//         }
//         return $next($request);
//     }
// }

// 3. En bootstrap/app.php - AGREGARLO al grupo web
// ->withMiddleware(function (Middleware $middleware) {
//     $middleware->web(append: [
//         HandleInertiaRequests::class,
//         \App\Http\Middleware\CheckSubscription::class, // ← ¡Añadido!
//     ]);
// });


// OPCIÓN 2: Directamente en la closure (NO recomendado)
// // bootstrap/app.php
// ->withMiddleware(function (Middleware $middleware) {
//     $middleware->web(append: [
//         HandleInertiaRequests::class,

//         // Middleware inline (mala práctica)
//         function ($request, $next) {
//             if (!auth()->check()) {
//                 return redirect('/login');
//             }
//             return $next($request);
//         },

//         // Otro middleware inline
//         function ($request, $next) {
//             // Lógica aquí...
//             return $next($request);
//         },
//     ]);
// });