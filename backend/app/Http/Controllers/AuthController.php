<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        try {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|string|min:10|max:16|unique:users',
                'password' => 'required|min:8|confirmed'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'message' => 'Invalid field',
                'error' => $errors
            ]);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'message' => "Welcome, $user->name",
            'token' => $user->createToken('auth_token')->plainTextToken
        ], 201);
    }

    public function login(Request $request) {
        $credentials = $request->only('phone', 'password');

        if(auth()->attempt($credentials)) {
            $user = User::where('phone', $request->phone)->first();

            return response()->json([
                'message' => "Welcome back, $user->name",
                'token' => $user->createToken('auth_token')->plainTextToken
            ], 201);
        } else {
            return response()->json([
                'message' => 'Wrong phone number or password'
            ], 401);
        }
    }

    public function logout() {
        if(auth()->user()) {
            auth()->user()->tokens()->delete();

            return response()->json([
                'message' => 'Successfully logged out'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
    }
}
