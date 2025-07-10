<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\BusinessDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TalentController;
use App\Http\Controllers\WorkerDashboardController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\Business\ListingController as BusinessListingController;
use App\Http\Controllers\Business\ProposalController as BusinessProposalController;
use App\Http\Controllers\ProposalController as WorkerProposalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name("home");

Route::middleware('auth')->get("me", fn() => Response::json(auth()->user()));

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin-dashboard', AdminDashboardController::class)->name('admin.dashboard');
});

Route::middleware(['auth', 'role:business'])->group(function () {
    Route::get('business-dashboard', BusinessDashboardController::class)->name('business.dashboard');

    Route::get('business/proposals', [BusinessProposalController::class, 'index'])->name('business.proposals.index');
    Route::get('business/listings/{listing}/proposals', [BusinessProposalController::class, 'listingProposals'])->name('business.listings.proposals');
    Route::get('business/proposals/{proposal}', [BusinessProposalController::class, 'show'])->name('business.proposals.show');
    Route::patch('business/proposals/{proposal}/status', [BusinessProposalController::class, 'updateStatus'])->name('business.proposals.update-status');

    Route::get('business/listings', [BusinessListingController::class, 'index'])->name('business.listings.index');
    Route::get('business/listings/create', [BusinessListingController::class, 'create'])->name('business.listings.create');
    Route::post('business/listings', [BusinessListingController::class, 'store'])->name('business.listings.store');
    Route::get('business/listings/{listing}', [BusinessListingController::class, 'show'])->name('business.listings.show');
    Route::get('business/listings/{listing}/edit', [BusinessListingController::class, 'edit'])->name('business.listings.edit');
    Route::put('business/listings/{listing}', [BusinessListingController::class, 'update'])->name('business.listings.update');
    Route::patch('business/listings/{listing}/status', [BusinessListingController::class, 'updateStatus'])->name('business.listings.update-status');
});

Route::middleware(['auth', 'role:worker'])->group(function () {
    Route::get('worker-dashboard', WorkerDashboardController::class)->name('worker.dashboard');

    Route::get('proposals', [WorkerProposalController::class, 'index'])->name('worker.proposals');
    Route::get('listings/{listing}/propose', [WorkerProposalController::class, 'create'])->name('proposals.create');
    Route::post('listings/{listing}/propose', [WorkerProposalController::class, 'store'])->name('proposals.store');
});

Route::get('listings', [ListingController::class, 'index'])->name('listings.index');
Route::get('listings/{listing}', [ListingController::class, 'show'])->name('listings.show');


Route::get('talents', [TalentController::class, 'index'])->name('talents.index');
Route::get('talents/{talent}', [TalentController::class, 'show'])->name('talents.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
