<?php
// app/Services/FoursquareService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class FoursquareService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.foursquare.base_url');
        $this->apiKey = config('services.foursquare.api_key');
    }

    /**
     * Busca lugares por texto + coordenadas o ciudad.
     */
    public function searchPlaces(
        string $query,
        float $lat = null,
        float $lon = null,
        int $radius = 5000,   // metros
        int $limit = 10,
        string $categories = null // ID de categoría Foursquare
    ): array {
        $params = [
            'query' => $query,
            'limit' => $limit,
            'fields' => 'fsq_id,name,location,categories,distance,rating,hours,photos,website,tel',
        ];

        if ($lat && $lon) {
            $params['ll'] = "{$lat},{$lon}";
            $params['radius'] = $radius;
        }

        if ($categories) {
            $params['categories'] = $categories;
        }

        $response = $this->get('/places/search', $params);

        return $response->json('results', []);
    }

    /**
     * Busca lugares cercanos sin texto (solo por coordenadas).
     */
    public function nearbyPlaces(
        float $lat,
        float $lon,
        int $limit = 10,
        string $categories = null
    ): array {
        $params = [
            'll' => "{$lat},{$lon}",
            'limit' => $limit,
            'fields' => 'fsq_id,name,location,categories,distance,rating,hours,photos',
        ];

        if ($categories) {
            $params['categories'] = $categories;
        }

        $response = $this->get('/places/nearby', $params);

        return $response->json('results', []);
    }

    /**
     * Detalle de un lugar por su FSQ ID.
     */
    public function getPlace(string $fsqId): array
    {
        $response = $this->get("/places/{$fsqId}", [
            'fields' => 'fsq_id,name,location,categories,rating,hours,photos,website,tel,description,price',
        ]);

        return $response->json() ?? [];
    }

    /**
     * Autocomplete (útil para buscadores en tiempo real).
     */
    public function autocomplete(
        string $query,
        float $lat = null,
        float $lon = null
    ): array {
        $params = ['query' => $query];

        if ($lat && $lon) {
            $params['ll'] = "{$lat},{$lon}";
        }

        $response = $this->get('/autocomplete', $params);

        return $response->json('results', []);
    }

    // ─── Helper interno ────────────────────────────────────────────────

    protected function get(string $endpoint, array $params = []): Response
    {
        $response = Http::withHeaders([
            'Authorization' => $this->apiKey,
            'Accept' => 'application/json',
        ])->get($this->baseUrl . $endpoint, $params);

        if ($response->failed()) {
            throw new \Exception(
                "Foursquare API error {$response->status()}: " . $response->body()
            );
        }

        return $response;
    }
}