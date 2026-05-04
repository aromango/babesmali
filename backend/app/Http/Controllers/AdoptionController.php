<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use App\Models\Animal;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{
    /**
     * =========================
     * USER: Crear solicitud
     * =========================
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'animal_id' => 'required|exists:animals,id',
        ]);

        // Evitar duplicados (mismo usuario y mismo animal)
        $alreadyRequested = Adoption::where('animal_id', $validated['animal_id'])
            ->where('user_id', $request->user()->id)
            ->exists();

        if ($alreadyRequested) {
            return response()->json([
                'message' => 'Dagoeneko animalia honen adopzioa eskatu duzu'
            ], 409);
        }

        $adoption = Adoption::create([
            'animal_id' => $validated['animal_id'],
            'user_id' => $request->user()->id,
            'egoera' => 'eskatuta',
        ]);

        return response()->json($adoption, 201);
    }

    /**
     * =========================
     * USER: Ver MIS adopciones
     * =========================
     */
    public function myAdoptions(Request $request)
    {
        return $request->user()
            ->adoptions()
            ->with('animal')
            ->get();
    }

    /**
     * =========================
     * ADMIN: Ver TODAS
     * =========================
     */
    public function index()
    {
        return Adoption::with(['animal', 'user'])->get();
    }

    
    public function approve(Adoption $adoption)
    {
        // Cambiar estado de la adopción
        $adoption->update([
            'egoera' => 'onartua',
        ]);

        // Marcar el animal como adoptado
        $adoption->animal->update([
            'egoera' => 'adoptatua',
        ]);

        return response()->json([
            'message' => 'Adopzioa onartuta'
        ]);
    }

   
    public function reject(Adoption $adoption)
    {
        $adoption->update([
            'egoera' => 'ukatua',
        ]);

        return response()->json([
            'message' => 'Adopzioa ukatuta'
        ]);
    }
}