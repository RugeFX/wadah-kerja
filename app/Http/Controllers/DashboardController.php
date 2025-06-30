<?php

namespace App\Http\Controllers;

use App\Models\BusinessProfile;
use App\Models\Listing;
use App\Models\PortfolioItem;
use App\Models\Proposal;
use App\Models\Review;
use App\Models\Skill;
use App\Models\User;
use App\Models\WorkerProfile;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $users = User::latest()->take(10)->get();
        
        $statistics = [
            'totalUsers' => User::count(),
            'verifiedUsers' => User::whereNotNull('email_verified_at')->count(),
            'totalBusinessProfiles' => BusinessProfile::count(),
            'totalWorkerProfiles' => WorkerProfile::count(),
            'totalSkills' => Skill::count(),
            'totalListings' => Listing::count(),
            'openListings' => Listing::where('status', 'OPEN')->count(),
            'inProgressListings' => Listing::where('status', 'IN_PROGRESS')->count(),
            'completedListings' => Listing::where('status', 'COMPLETED')->count(),
            'totalProposals' => Proposal::count(),
            'totalReviews' => Review::count(),
            'averageRating' => (float) Review::avg('rating') ?? 0,
            'totalPortfolioItems' => PortfolioItem::count(),
        ];

        return Inertia::render('dashboard', compact('users', 'statistics'));
    }
} 