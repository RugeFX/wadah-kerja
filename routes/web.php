<?php

use App\Http\Controllers\DashboardController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name("home");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
