<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    
    public function index()
    {
        return Animal::all();
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'espeziea' => 'required|string|max:255',
            'arraza' => 'nullable|string|max:255',
            'adina' => 'required|integer|min:0',
            'egoera' => 'required|in:eskuragarri,adoptatua',
            'argazkia' => 'nullable|string',
        ]);

        return Animal::create($validated);
    }

   
    public function show(Animal $animal)
    {
        return $animal;
    }

    
    public function update(Request $request, Animal $animal)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'espeziea' => 'required|string|max:255',
            'arraza' => 'nullable|string|max:255',
            'adina' => 'required|integer|min:0',
            'egoera' => 'required|in:eskuragarri,adoptatua',
            'argazkia' => 'nullable|string',
        ]);

        $animal->update($validated);

        return $animal;
    }

   
    public function destroy(Animal $animal)
    {
        $animal->delete();

        return response()->json([
            'message' => 'Animal ezabatuta'
        ]);
    }
}