<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\DirectorController;
use App\Http\Controllers\Api\GeneroController;
use App\Http\Controllers\Api\ObraController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// --- Directores --- 
Route::get('/directores',      [DirectorController::class, 'index']);
Route::get('/directores/{id}', [DirectorController::class, 'show']);

// --- Generos --- 
Route::get('/generos',         [GeneroController::class, 'index']);
Route::post('/generos',        [GeneroController::class, 'store']);
Route::put('/generos/{id}',    [GeneroController::class, 'update']);
Route::delete('/generos/{id}', [GeneroController::class, 'destroy']);

// --- Obras --- 
Route::get('/obras',      [ObraController::class, 'index']);   // ?nombre=&genero=&director=
Route::get('/obras/{id}', [ObraController::class, 'show']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
