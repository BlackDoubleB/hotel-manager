<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    // CONFIGURA RUTAS (NO solo los archivos)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    // CONFIGURA MIDDLEWARES (NO solo llama a otros)
    // Internamente configura el Kernel HTTP:
    ->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleInertiaRequests::class,//AGREGARLO al grupo web (HandleInertiaRequests)
    ]);
    $middleware->redirectGuestsTo('/login');
    $middleware->redirectUsersTo('/reservation/create');

    // 2. Configurar ALIAS para middlewares específicos
    // $middleware->alias([
    //     'admin' => CheckAdmin::class,
    //     'subscription' => CheckSubscription::class,
    // ]);
    })
    
    // CONFIGURA MANEJO DE EXCEPCIONES
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create(); // Application::create() retorna una Application CONFIGURADA:

// lA FUNCION CREATE() POR DENTRO HACE
//  public function create()
// {
//     // 1. Crea la instancia de Application
//     $app = new Application($this->basePath);
    
//     // 2. Configura TODO lo que definiste
//     $this->configure($app);
    
//     // 3. ¡Registra handleRequest COMO SINGLETON!
//     $app->singleton(
//         \Illuminate\Contracts\Http\Kernel::class,
//         \Illuminate\Foundation\Http\Kernel::class
//     );
    
//     // 4. Retorna la aplicación CONFIGURADA
//     return $app;
// }

// ¿QUÉ ES $app REALMENTE?
// $app es una instancia de Illuminate\Foundation\Application, que SÍ TIENE el método handleRequest():

// Illuminate\Foundation\Application
// class Application extends Container implements ApplicationContract
// {
//     // ... muchas propiedades y métodos ...
    
//     /**
//      * Handle the incoming HTTP request.
//      */
//     public function handleRequest(Request $request)
//     {
//     // 1. Guarda request en contenedor
//     $this->instance('request', $request);
    
//     // 2. OBTIENE Kernel del contenedor (ya está registrado)
//     $kernel = $this->make(\Illuminate\Contracts\Http\Kernel::class);
    
//     // 3. ¡PASA request al Kernel para que lo PROCESE!
//     $response = $kernel->handle($request);
    
//     // 4. Terminación
//     $this->terminateRequest($request, $response);
    
//     // 5. Retorna response
//     return $response;
//     }
// }

// EN EL PASO 3 ANTERIOR Kernel::handle()
// En Kernel.php (PROCESADOR PRINCIPAL)
// public function handle($request)
// {
//     // 1. Bootstrapping (inicia proveedores)
//     $this->bootstrap();
    
//     // 2. ENVIA request a través del ROUTER (¡CON RUTAS!)
//     $response = $this->sendRequestThroughRouter($request);
//     //                      ↑
//     // ¡ESTE MÉTODO SÍ PROCESA LAS RUTAS!
    
//     return $response;
// }


// DENTRO DE sendRequestThroughRouter() - EL NÚCLEO
// protected function sendRequestThroughRouter($request)
// {
//     // 1. Pone request en contenedor
//     $this->app->instance('request', $request);
    
//     // 2. Ejecuta middlewares GLOBALES
//     // 3. ¡LLAMA AL ROUTER QUE USA TUS RUTAS!
//     return (new Pipeline($this->app))
//         ->send($request)
//         ->through($this->middleware) // Middlewares globales
//         ->then(function ($request) {
//             // ¡AQUÍ FINALMENTE USA EL ROUTER CON TUS RUTAS!
//             $this->app->instance('request', $request);
            
//             return $this->router->dispatch($request);
//             // ↑ Router busca en routes/web.php
//             // ↑ Encuentra ruta → Ejecuta middlewares de ruta → Controller
//         });
// }

//Paso 6: Router::dispatch() - USA TUS RUTAS
// En Router.php
// public function dispatch(Request $request)
// {
//     // 1. Encuentra la ruta en routes/web.php
//     $route = $this->findRoute($request);
    
//     // 2. Ejecuta middlewares de ESA RUTA (auth, etc.)
//     // 3. Ejecuta el Controller
//     $response = $this->runRoute($request, $route);
    
//     return $response;
//     // Este response viene del Controller:
//     // return Inertia::render(...) o response()->json(...)
// }

// Paso 7: Controller ejecuta TU código
// Tu Controller
// public function index()
// {
//     // Tu lógica aquí
//     $data = User::all();
    
//     // Para Inertia:
//     return Inertia::render('Dashboard', ['users' => $data]);
//     // O para API:
//     // return response()->json($data);
// }


// Paso 8: VUELTA a través de middlewares
// La respuesta del Controller VUELVE por:
// 1. Middlewares de ruta (ej: 'auth' ya hizo su trabajo)
// 2. Middlewares globales (ej: HandleInertiaRequests AÑADE datos aquí)
// 3. Kernel la recibe
// 4. Application::terminateRequest() hace limpieza

//Paso 9: Retorno a index.php
// handleRequest() retorna response a index.php
// Pero index.php NO HACE NADA MÁS

// Laravel AUTOMÁTICAMENTE envía la response:
// Internamente hace: $response->send()
// Que envía: Headers HTTP + Contenido (HTML/JSON)

// Paso 10: Apache/Nginx recibe la response
// Laravel → Headers HTTP + Contenido → Apache/Nginx → Navegador





// En Laravel 12 hay DOS formas de configurar middlewares y se ven similares. Vamos a aclararlo:
// ¡SON DOS COSAS DIFERENTES!
// 1. $middleware->web() - MIDDLEWARES GLOBALES PARA RUTAS WEB    
// // bootstrap/app.php
// ->withMiddleware(function ($middleware) {
//     // Estos son "globales" para CADA TIPO de ruta
//     $middleware->web([...]);    // ← Para TODAS las rutas web
//     $middleware->api([...]);    // ← Para TODAS las rutas api
// })



// RUTAS WEB (routes/web.php)
// // Para NAVEGADORES (páginas completas)
// // Ejemplos:
// Route::get('/dashboard', ...);      // ← Usuario ve página HTML
// Route::post('/contact', ...);       // ← Formulario tradicional
// Route::get('/products/{id}', ...);  // ← Página de producto

// RUTAS API (routes/api.php)
// // Para APLICACIONES/CLIENTES (JSON)
// // Ejemplos:
// Route::get('/api/users', ...);      // ← App móvil pide datos JSON
// Route::post('/api/orders', ...);    // ← Frontend React hace fetch()
// Route::delete('/api/posts/{id}', ...); // ← JavaScript borra recurso

// 2. $middleware->alias() - DEFINIR ALIAS PARA USAR EN RUTAS
// // bootstrap/app.php  
// $middleware->alias([
//         'auth' => \App\Http\Middleware\Authenticate::class,
//         'admin' => \App\Middleware\CheckAdmin::class,
//         'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
//         // ↑ Estos NO se aplican automáticamente
//         // ↑ Solo cuando los usas en routes/web.php
//     ]);

// CONFUSIÓN COMÚN: LOS GRUPOS PREDEFINIDOS
// Laravel YA TIENE middlewares en el grupo 'web'. Cuando usas $middleware->web(append: [...]), estás añadiendo a los que ya existen:
// Grupo 'web' por DEFECTO (invisible):
// [
//     \Illuminate\Session\Middleware\StartSession::class,
//     \Illuminate\View\Middleware\ShareErrorsFromSession::class, 
//     \App\Http\Middleware\VerifyCsrfToken::class,
//     // ... más
// ]

// Cuando añades:
// $middleware->web(append: [
//     \App\Middleware\HandleInertiaRequests::class,
// ]);
// El grupo 'web' final es:
// [
//     \Illuminate\Session\Middleware\StartSession::class,     // ← Por defecto
//     \Illuminate\View\Middleware\ShareErrorsFromSession::class, // ← Por defecto
//     \App\Http\Middleware\VerifyCsrfToken::class,            // ← Por defecto
//     \App\Middleware\HandleInertiaRequests::class,           // ← Tu añadido
// ]

//FLUJO COMPLETO CON CONFIGURACIÓN REAL:
// Archivo COMPLETO bootstrap/app.php:
// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         api: __DIR__.'/../routes/api.php',
//     )
//     ->withMiddleware(function (Http\Middleware $middleware) {
//         // PARTE A: Middlewares GLOBALES para grupos
//         // Se aplican AUTOMÁTICAMENTE a TODAS las rutas del grupo
        
//         // Para TODAS las rutas en routes/web.php
//         $middleware->web(append: [
//             \App\Middleware\HandleInertiaRequests::class, // ← GLOBAL WEB
//         ]);
        
//         // Para TODAS las rutas en routes/api.php  
//         $middleware->api(prepend: [
//             \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
//         ]);
        
//         // PARTE B: Definir ALIAS para usar en rutas específicas
//         // NO se aplican automáticamente
//         $middleware->alias([
//             'auth' => \App\Http\Middleware\Authenticate::class,
//             'admin' => \App\Middleware\CheckAdmin::class,
//             'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
//             // ↑ Estos son como "funciones" que puedes llamar
//         ]);
//     })
//     ->create();


// Archivo routes/web.php:
// // RUTA 1: Con middlewares ESPECÍFICOS
// Route::get('/admin', [AdminController::class, 'index'])
//     ->middleware(['auth', 'admin', 'verified']);
//     // ↑ Usa los ALIAS definidos en app.php
//     // ↑ Estos SOLO se aplican a /admin

// // RUTA 2: Sin middlewares específicos  
// Route::get('/public', [HomeController::class, 'index']);
// // ↑ SOLO ejecuta los GLOBALES de $middleware->web()
// // ↑ NO ejecuta 'auth', 'admin', 'verified'