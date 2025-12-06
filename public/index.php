<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
// PASO 1
// Apache recibe el request
// Luego carga index.php

// PASO 2 
// Se ejecuta las lineas anteriores
// Cuando llega a esta línea:
$app = require_once __DIR__.'/../bootstrap/app.php';

// require_once: Carga el archivo bootstrap/app.php una sola vez (si ya está cargado, no lo vuelve a cargar)
// bootstrap/app.php: El "corazón" de Laravel 12. 
// Contiene:
// return Application::configure(basePath: dirname(__DIR__))
// ->withRouting(...)
// ->withMiddleware(...)
// ->withExceptions(...)
// ->create();
// En resume: Retorna una instancia de Application (el contenedor de servicios de Laravel)

$app->handleRequest(Request::capture());
//Esta línea es LA MÁS IMPORTANTE. (create() registra el Kernel)

//  Desglosemos:
// En Illuminate\Http\Request
// public static function capture()
// {
//     // 1. Crea un Request desde las superglobals de PHP
//     static::enableHttpMethodParameterOverride();
    
//     // 2. Usa Symfony para crear la request
//     $request = static::createFromGlobals();
    
//     // Esto convierte:
//     // $_GET, $_POST, $_COOKIE, $_FILES, $_SERVER
//     // ↓
//     // En un objeto Request elegante de Laravel
//     return $request;
// }

// handleRequest() usa el Kernel y retorna la Response

// ¿QUÉ PASA DESPUÉS DE handleRequest()?
// Laravel automáticamente envía la respuesta:
// Internamente, después de index.php:
// $response->send(); No ves $response->send() porque Laravel lo hace automáticamente al final del script PHP.// Envía headers y contenido
// $kernel->terminate($request, $response); // Limpieza



// DIAGRAMA CORREGIDO:
// 1. Navegador → Apache/Nginx
// 2. Apache → public/index.php
// 3. index.php → $app = require bootstrap/app.php
// 4. index.php → $app->handleRequest(Request::capture())
//    ↓
// 5. Application::handleRequest() 
//    → $kernel = $this->make(Kernel::class)
//    → $response = $kernel->handle($request)
//    ↓
// 6. Kernel::handle()
//    → $this->sendRequestThroughRouter($request)
//    ↓
// 7. sendRequestThroughRouter()
//    → Middlewares globales
//    → then() { $this->router->dispatch($request) }
//    ↓
// 8. Router::dispatch()
//    → Busca en routes/web.php
//    → Ejecuta middlewares de ruta
//    → Ejecuta Controller
//    ↓
// 9. TU Controller
//    → return Inertia::render() o response()->json()
//    ↓
// 10. Router recibe response → pasa a Kernel
// 11. Kernel recibe response → pasa a Application
// 12. Application::terminateRequest() → retorna response
// 13. index.php recibe response
// 14. Laravel AUTOMÁTICAMENTE ejecuta $response->send()
// 15. Headers + Contenido → Apache → Navegador