<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkerProfile;
use Inertia\Response;

class BusinessDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $businessProfile = $request->user()->businessProfile;

        $recentListings = $businessProfile->listings()
            ->with(['skills', 'proposals'])
            ->latest()
            ->take(5)
            ->get();

        $recentProposals = $businessProfile->listings()
            ->with(['proposals.workerProfile.user', 'proposals.workerProfile.skills'])
            ->whereHas('proposals')
            ->get()
            ->pluck('proposals')
            ->flatten()
            ->sortByDesc('created_at')
            ->take(5)
            ->values();

        $topApplicants = WorkerProfile::query()
            ->with(['user', 'skills'])
            ->whereHas('proposals.listing', function ($query) use ($businessProfile) {
                $query->where('business_profile_id', $businessProfile->id);
            })
            ->orderByDesc('average_rating')
            ->take(5)
            ->get();

        $stats = [
            'totalListings' => $businessProfile->listings()->count(),
            'openListings' => $businessProfile->listings()->where('status', 'OPEN')->count(),
            'inProgressListings' => $businessProfile->listings()->where('status', 'IN_PROGRESS')->count(),
            'completedListings' => $businessProfile->listings()->where('status', 'COMPLETED')->count(),
            'totalProposals' => $businessProfile->listings()->withCount('proposals')->get()->sum('proposals_count'),
            'totalReviews' => $businessProfile->listings()->withCount('reviews')->get()->sum('reviews_count'),
            'averageRating' => $businessProfile->listings()->withCount('reviews')->get()->avg('reviews_count'),
        ];

        // dd(compact('businessProfile', 'stats', 'recentListings', 'recentProposals', 'topApplicants'));

        return inertia('business-dashboard', compact('businessProfile', 'stats', 'recentListings', 'recentProposals', 'topApplicants'));
    }
}