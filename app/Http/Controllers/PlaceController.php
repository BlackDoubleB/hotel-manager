<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function places()
    {
        return Inertia::render('placesView', [
            'places' => $this->searchPlace()
        ]);
    }
       public function searchPlace(Request $request = null)
    {
        // 1. Obtener la ciudad/país si lo envían (aunque en esa URL particular no lo estás usando)
        $city = $request->query('city');

        // 2. Hacer la petición a la API
        $response = Http::get('https://restcountries.com/v3.1/all?fields=name,flags');

        // 3. Manejar respuesta exitosa
        if($response->successful()){
            // Laravel automáticamente convertirá este arreglo en una respuesta JSON válida
            return response()->json([
                "data" => $response->json(), // Aquí sacamos los datos reales del cuerpo de la petición
                "code" => $response->status()
            ]);
        }

        // 4. Manejar el error
        return response()->json([
            "data" => null,
            "message" => "Ocurrió un error al conectar con la API externa",
            "code" => $response->status()
        ], $response->status());
    }


    
}
