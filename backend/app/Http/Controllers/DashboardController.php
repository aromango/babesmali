<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Animal;
use App\Models\Adoption;
use App\Models\Event;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    
    public function stats()
    {
        return response()->json([
            'animals_total' => Animal::count(),
            'animals_available' => Animal::where('egoera', 'eskuragarri')->count(),
            'adoptions_total' => Adoption::count(),
            'events_total' => Event::count(),
            'volunteers_total' => User::where('role', 'user')->count(),
            'events' => Event::withCount('users')->get(),
        ]);
    }

    
    public function dogInfo()
    {
        $response = Http::withHeaders([
            'x-api-key' => config('services.dog.api_key'),
        ])->get('https://api.thedogapi.com/v1/breeds');

        if (!$response->successful()) {
            return response()->json(null);
        }

        $breeds = $response->json();
        $random = $breeds[array_rand($breeds)];

        return response()->json([
            'name' => $random['name'] ?? 'Ezezaguna',
            'origin' => $random['origin'] ?? 'Ezezaguna',
            'image' => $random['image']['url'] ?? null,
        ]);
    }
}