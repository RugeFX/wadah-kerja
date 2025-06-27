<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name("home");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
