<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkquController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function() {
    Route::post('/v1/auth/login', [AuthController::class, 'login']);
    Route::post('/v1/auth/register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/v1/auth/logout', [AuthController::class, 'logout']);
});


Route::get('/v1/test', [LinkquController::class, 'topup']);

Route::post('/v1/topupVA', [LinkquController::class, 'createVirtualAccount']);
Route::post('/v1/callbackVa', [LinkquController::class, 'handleCallbackVa']);

Route::post('/v1/topupRet', [LinkquController::class, 'createRetailPayment']);
Route::post('/v1/topupQris', [LinkquController::class, 'createQris']);
Route::post('/v1/ovoPush', [LinkquController::class, 'createOvoPush']);
Route::post('/v1/ewallet', [LinkquController::class, 'createPaymentEwallet']);