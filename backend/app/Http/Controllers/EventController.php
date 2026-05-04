<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('users')->get();
    }

    public function join(Request $request, Event $event)
    {
        // Evitar duplicados
        if ($request->user()->events()->where('event_id', $event->id)->exists()) {
            return response()->json([
                'message' => 'Dagoeneko ekitaldi honetan izena emanda zaude'
            ], 409);
        }

        $request->user()->events()->attach($event->id);

        return response()->json([
            'message' => 'Ekitaldian izena eman duzu'
        ]);
    }

    public function myEvents(Request $request)
    {
        return $request->user()->events;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskribapena' => 'nullable|string',
            'data' => 'required|date',
            'lekua' => 'required|string|max:255',
        ]);

        return Event::create($validated);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskribapena' => 'nullable|string',
            'data' => 'required|date',
            'lekua' => 'required|string|max:255',
        ]);

        $event->update($validated);

        return $event;
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Ekitaldia ezabatu da'
        ]);
    }
}