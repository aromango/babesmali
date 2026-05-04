<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| PUBLIC AUTH ROUTES
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (AUTHENTICATED USERS)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // --- Auth ---
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    
    Route::get('/animals', [AnimalController::class, 'index']);
    Route::post('/animals', [AnimalController::class, 'store']);
    Route::get('/animals/{animal}', [AnimalController::class, 'show']);
    Route::put('/animals/{animal}', [AnimalController::class, 'update']);
    Route::delete('/animals/{animal}', [AnimalController::class, 'destroy']);

    
    Route::post('/adopzioak', [AdoptionController::class, 'store']);
    Route::get('/adopzioak', [AdoptionController::class, 'myAdoptions']);

   
    Route::get('/ekitaldiak', [EventController::class, 'index']);
    Route::post('/ekitaldiak/{event}/join', [EventController::class, 'join']);
    Route::get('/nire-ekitaldiak', [EventController::class, 'myEvents']);

    

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);

});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES (AUTH + ADMIN)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    
    Route::get('/admin/adopzioak', [AdoptionController::class, 'index']);
    Route::put('/admin/adopzioak/{adoption}/approve', [AdoptionController::class, 'approve']);
    Route::put('/admin/adopzioak/{adoption}/reject', [AdoptionController::class, 'reject']);

    
    Route::post('/admin/ekitaldiak', [EventController::class, 'store']);
    Route::put('/admin/ekitaldiak/{event}', [EventController::class, 'update']);
    Route::delete('/admin/ekitaldiak/{event}', [EventController::class, 'destroy']);

    Route::get('/admin/dashboard', [DashboardController::class, 'stats']);
    Route::get('/admin/dog-info', [DashboardController::class, 'dogInfo']);

});