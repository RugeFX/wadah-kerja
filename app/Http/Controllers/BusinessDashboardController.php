<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Proposal;
use App\Models\Review;
use App\Models\WorkerProfile;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class BusinessDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $businessProfile = Auth::user()->businessProfile;

        $listings = Listing::where('business_profile_id', $businessProfile->id);
        $proposals = Proposal::whereIn('listing_id', $listings->pluck('id'));
        $reviews = Review::whereIn('listing_id', $listings->pluck('id'));

        $stats = [
            'totalListings' => $listings->count(),
            'openListings' => $listings->where('status', 'OPEN')->count(),
            'inProgressListings' => $listings->where('status', 'IN_PROGRESS')->count(),
            'completedListings' => $listings->where('status', 'COMPLETED')->count(),
            'totalProposals' => $proposals->count(),
            'totalReviews' => $reviews->count(),
            'averageRating' => (float) $reviews->avg('rating') ?? 0,
        ];

        $recentListings = $businessProfile->listings()
            ->with(['proposals', 'skills', 'businessProfile'])
            ->latest()
            ->take(5)
            ->get();

        $topApplicants = WorkerProfile::with(['user', 'skills'])
            ->whereHas('proposals', function ($query) use ($businessProfile) {
                $query->whereIn('listing_id', $businessProfile->listings()->pluck('id'));
            })
            ->orderByDesc('average_rating')
            ->orderByDesc('completed_projects_count')
            ->take(5)
            ->get();

        return inertia('business-dashboard', compact("stats", "recentListings", "topApplicants"));
    }
}