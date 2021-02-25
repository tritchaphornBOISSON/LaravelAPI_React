<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\FavorisController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;



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



/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/




Route::group([
    'middleware' => ['api', 'cors'],
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'user']);
});




Route::get('/utilisateurs', [UserController::class, 'index']);
Route::get('/utilisateurs/{id}', [UserController::class, 'show']);
Route::post('/utilisateurs', [UserController::class, 'store']);
Route::put('/utilisateurs/{id}', [UserController::class, 'update']);
Route::delete('/utilisateurs/{id}', [UserController::class, 'destroy']);
Route::put('/utilisateursAdmin/{id}', [UserController::class, 'update1']);

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::post('/restaurants', [RestaurantController::class, 'store']);
Route::put('/restaurants/{id}', [RestaurantController::class, 'update']);
Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);

Route::get('/menus', [MenuController::class, 'index']);
Route::get('/menus/{id}', [MenuController::class, 'show']);
Route::post('/menus', [MenuController::class, 'store']);
Route::put('/menus/{id}', [MenuController::class, 'update']);
Route::delete('/menus/{id}', [MenuController::class, 'destroy']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::get('/favoris', [FavorisController::class, 'index']);
Route::get('/favoris/{id}', [FavorisController::class, 'show']);
//Route::get('/favoris/{id}', [FavorisController::class, 'index']);
Route::post('/favoris', [FavorisController::class, 'store']);
Route::put('/favoris/{id}', [FavorisController::class, 'update']);
Route::delete('/favoris/{id}', [FavorisController::class, 'destroy']);

Route::get('/notes', [NoteController::class, 'index']);
Route::get('/notes/{id}', [NoteController::class, 'show']);
Route::post('/notes', [NoteController::class, 'store']);
Route::put('/notes/{id}', [NoteController::class, 'update']);
Route::delete('/notes/{id}', [NoteController::class, 'destroy']);

Route::get('/commentaires/{id}', [CommentaireController::class, 'index']);
Route::get('/commentaires', [CommentaireController::class, 'indexAdmin']);
Route::get('/commentaire/{id}', [CommentaireController::class, 'show']);
Route::get('/commentaires/users/{id}', [CommentaireController::class, 'count']);
Route::post('/commentaires', [CommentaireController::class, 'store']);
Route::put('/commentaires/{id}', [CommentaireController::class, 'update']);
Route::delete('/commentaires/{id}', [CommentaireController::class, 'destroy']);
