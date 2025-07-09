<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ProposalController extends Controller
{
    /**
     * Show the form for creating a new proposal.
     */
    public function create(Request $request, Listing $listing): Response
    {
        $existingProposal = Proposal::where('worker_profile_id', $request->user()->workerProfile->id)
            ->where('listing_id', $listing->id)
            ->first();

        $listing->load(['businessProfile', 'skills']);

        return inertia('proposals/create', [
            'listing' => $listing,
            'existingProposal' => $existingProposal,
        ]);
    }

    /**
     * Store a newly created proposal in storage.
     */
    public function store(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'cover_letter' => 'required|string|min:50|max:5000',
        ]);

        $existingProposal = Proposal::where('worker_profile_id', $request->user()->workerProfile->id)
            ->where('listing_id', $listing->id)
            ->first();

        if ($existingProposal) {
            return redirect()->back()->with('error', 'You have already submitted a proposal for this listing.');
        }

        Proposal::create([
            'listing_id' => $listing->id,
            'worker_profile_id' => $request->user()->workerProfile->id,
            'cover_letter' => $validated['cover_letter'],
            'status' => 'SENT',
        ]);

        return redirect()->route('worker.proposals')->with('success', 'Proposal submitted successfully!');
    }

    /**
     * Display a listing of the worker's proposals.
     */
    public function index(): Response
    {
        $proposals = Proposal::where('worker_profile_id', Auth::user()->workerProfile->id)
            ->with(['listing.businessProfile', 'listing.skills'])
            ->latest()
            ->paginate(10);

        return inertia('proposals/index', [
            'proposals' => $proposals,
        ]);
    }
}