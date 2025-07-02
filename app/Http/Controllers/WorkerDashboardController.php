<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Response;

class WorkerDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $workerProfile = $request->user()->workerProfile;

        $totalApplications = Proposal::where('worker_profile_id', $workerProfile->id)->count();

        $activeJobs = $workerProfile->listingAssignments()
            ->where('status', 'ACTIVE')
            ->count();

        $unreadMessages = 0;

        $recommendedListings = Listing::where('status', 'OPEN')
            ->whereHas('skills', function ($query) use ($workerProfile) {
                $query->whereIn('skills.id', $workerProfile->skills->pluck('id'));
            })
            ->with(['businessProfile', 'skills'])
            ->latest()
            ->take(6)
            ->get();

        return inertia('worker-dashboard', [
            'workerProfile' => $workerProfile,
            'stats' => [
                'totalApplications' => $totalApplications,
                'activeJobs' => $activeJobs,
                'unreadMessages' => $unreadMessages,
            ],
            'recommendedListings' => $recommendedListings,
        ]);
    }
}