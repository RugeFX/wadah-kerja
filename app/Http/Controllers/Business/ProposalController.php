<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ProposalController extends Controller
{
    /**
     * Display a listing of proposals for all business listings.
     */
    public function index(Request $request): Response
    {
        $businessProfile = $request->user()->businessProfile;
        $listingIds = $businessProfile->listings()->pluck('id');

        $query = Proposal::whereIn('listing_id', $listingIds)
            ->with(['listing', 'workerProfile.user', 'workerProfile.skills']);

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        if ($request->has('listing_id') && $request->listing_id) {
            $query->where('listing_id', $request->listing_id);
        }

        $sort = $request->input('sort', 'latest');
        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;
            case 'worker_rating':
                $query->join('worker_profiles', 'proposals.worker_profile_id', '=', 'worker_profiles.id')
                    ->orderByDesc('worker_profiles.average_rating')
                    ->select('proposals.*');
                break;
            default:
                $query->latest();
                break;
        }

        $proposals = $query->paginate(10)->withQueryString();

        $listings = $businessProfile->listings()
            ->select('id', 'title')
            ->orderBy('title')
            ->get();

        return inertia('business/proposals/index', [
            'proposals' => $proposals,
            'listings' => $listings,
            'filters' => [
                'status' => $request->input('status'),
                'listing_id' => $request->input('listing_id'),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Display proposals for a specific listing.
     */
    public function listingProposals(Request $request, Listing $listing): Response
    {
        if ($listing->business_profile_id !== $request->user()->businessProfile->id) {
            abort(403);
        }

        $query = Proposal::where('listing_id', $listing->id)
            ->with(['workerProfile.user', 'workerProfile.skills']);

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $sort = $request->input('sort', 'latest');
        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;
            case 'worker_rating':
                $query->join('worker_profiles', 'proposals.worker_profile_id', '=', 'worker_profiles.id')
                    ->orderByDesc('worker_profiles.average_rating')
                    ->select('proposals.*');
                break;
            default:
                $query->latest();
                break;
        }

        $proposals = $query->paginate(10)->withQueryString();

        return inertia('business/proposals/listing', [
            'listing' => $listing->load('skills', 'businessProfile'),
            'proposals' => $proposals,
            'filters' => [
                'status' => $request->input('status'),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Show the details of a specific proposal.
     */
    public function show(Request $request, Proposal $proposal): Response
    {
        $businessProfile = $request->user()->businessProfile;
        $listingIds = $businessProfile->listings()->pluck('id')->toArray();

        // TODO: use policies instead
        if (!in_array($proposal->listing_id, $listingIds)) {
            abort(403);
        }

        if ($proposal->status === 'SENT') {
            $proposal->update(['status' => 'VIEWED']);
        }

        $proposal->load([
            'listing.skills',
            'listing.businessProfile',
            'workerProfile.user',
            'workerProfile.skills',
            'workerProfile.portfolioItems',
        ]);

        $otherProposals = Proposal::where('worker_profile_id', $proposal->worker_profile_id)
            ->whereIn('listing_id', $listingIds)
            ->where('id', '!=', $proposal->id)
            ->with('listing')
            ->get();

        return inertia('business/proposals/show', [
            'proposal' => $proposal,
            'otherProposals' => $otherProposals,
        ]);
    }

    /**
     * Update the status of a proposal.
     */
    public function updateStatus(Request $request, Proposal $proposal)
    {
        $businessProfile = $request->user()->businessProfile;
        $listingIds = $businessProfile->listings()->pluck('id')->toArray();

        if (!in_array($proposal->listing_id, $listingIds)) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:VIEWED,ACCEPTED,REJECTED',
        ]);

        $proposal->update(['status' => $validated['status']]);

        if ($validated['status'] === 'ACCEPTED') {
            Proposal::where('listing_id', $proposal->listing_id)
                ->where('id', '!=', $proposal->id)
                ->update(['status' => 'REJECTED']);

            $proposal->listing->update(['status' => 'IN_PROGRESS']);
        }

        return redirect()->back()->with('success', 'Status proposal berhasil diperbarui.');
    }
}