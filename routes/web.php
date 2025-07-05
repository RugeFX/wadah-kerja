<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\BusinessDashboardController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\TalentController;
use App\Http\Controllers\WorkerDashboardController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name("home");

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin-dashboard', AdminDashboardController::class)->name('admin.dashboard');
});

Route::middleware(['auth', 'role:business'])->group(function () {
    Route::get('business-dashboard', BusinessDashboardController::class)->name('business.dashboard');
});

Route::middleware(['auth', 'role:worker'])->group(function () {
    Route::get('worker-dashboard', WorkerDashboardController::class)->name('worker.dashboard');
});

// Job Listings
Route::get('listings', [ListingController::class, 'index'])->name('listings.index');
Route::get('listings/{listing}', [ListingController::class, 'show'])->name('listings.show');

// Talent Listings
Route::get('talents', [TalentController::class, 'index'])->name('talents.index');
Route::get('talents/{talent}', [TalentController::class, 'show'])->name('talents.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
