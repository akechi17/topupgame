<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function() {
    Route::post('/v1/auth/login', [AuthController::class, 'login']);
    Route::post('/v1/auth/register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/v1/auth/logout', [AuthController::class, 'logout']);
});