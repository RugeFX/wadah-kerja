<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\WorkerProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    // Worker profile settings routes (protected by worker role middleware in the controller)
    Route::middleware('role:worker')->group(function () {
        Route::get('settings/worker-profile', [WorkerProfileController::class, 'edit'])->name('worker-profile.edit');
        Route::patch('settings/worker-profile', [WorkerProfileController::class, 'update'])->name('worker-profile.update');

        // Portfolio item routes
        Route::post('settings/worker-profile/portfolio', [WorkerProfileController::class, 'storePortfolioItem'])->name('worker-profile.portfolio.store');
        Route::patch('settings/worker-profile/portfolio/{portfolioItem}', [WorkerProfileController::class, 'updatePortfolioItem'])->name('worker-profile.portfolio.update');
        Route::delete('settings/worker-profile/portfolio/{portfolioItem}', [WorkerProfileController::class, 'destroyPortfolioItem'])->name('worker-profile.portfolio.destroy');
    });
});
