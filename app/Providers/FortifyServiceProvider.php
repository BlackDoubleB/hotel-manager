<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Fortify;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LogoutResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // register() es el lugar oficial para registrar bindings en el contenedor de dependencias.
        // Cuando alguien pida LogoutResponse::class, entrega ESTE objeto que yo construí.”
        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse {
            public function toResponse($request)
            {
                return redirect('/login');
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // boot() normalmente se usa para CONFIGURAR servicios ya cargados.
        
        // ¿Entonces Fortify cómo usa esas clases si tú no las registraste con $this->app?
        // Porque Fortify por dentro ya está preparado para resolverlas desde el contenedor.
        // Y normalmente esas clases (por ejemplo CreateNewUser) implementan interfaces/contratos de Fortify, algo como:
        // Laravel\Fortify\Contracts\CreatesNewUsers
        // UpdatesUserProfileInformation
        // etc.
        // 📌 O sea: la “firma” existe, pero está en esas clases, no en el provider.
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::redirectUserForTwoFactorAuthenticationUsing(RedirectIfTwoFactorAuthenticatable::class);
        Fortify::loginView(function () {
            return Inertia::render('Auth/Login');
        });
        Fortify::registerView(function () {
            return Inertia::render('Auth/Register');
        });
        // Fortify::verifyEmailView(function () {
        //     return Inertia::render('Auth/VerifyEmail');
        // });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
