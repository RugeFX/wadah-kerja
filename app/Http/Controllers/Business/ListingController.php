<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ListingController extends Controller
{
    /**
     * Display a listing of the business's listings.
     */
    public function index(Request $request): Response
    {
        $businessProfile = $request->user()->businessProfile;

        $query = $businessProfile->listings()
            ->with(['skills', 'proposals']);

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $sort = $request->input('sort', 'latest');
        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;
            case 'proposals_high':
                $query->withCount('proposals')
                    ->orderByDesc('proposals_count');
                break;
            default:
                $query->latest();
                break;
        }

        $listings = $query->paginate(10)->withQueryString();

        return inertia('business/listings/index', [
            'listings' => $listings,
            'filters' => [
                'status' => $request->input('status'),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new listing.
     */
    public function create(): Response
    {
        $skills = Skill::orderBy('name')->get();

        return inertia('business/listings/create', [
            'skills' => $skills,
        ]);
    }

    /**
     * Store a newly created listing in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validateListing($request);

        $businessProfile = $request->user()->businessProfile;

        // Create the listing
        $listing = $businessProfile->listings()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'listing_type' => $validated['listing_type'],
            'status' => 'OPEN',

            // Project
            'project_budget_min' => $validated['listing_type'] === 'PROJECT' ? $validated['project_budget_min'] : null,
            'project_budget_max' => $validated['listing_type'] === 'PROJECT' ? $validated['project_budget_max'] : null,

            // Time-based
            'rate_type' => $validated['listing_type'] === 'TIME_BASED' ? $validated['rate_type'] : null,
            'rate_amount' => $validated['listing_type'] === 'TIME_BASED' ? $validated['rate_amount'] : null,
            'start_datetime' => $validated['listing_type'] === 'TIME_BASED' ? $validated['start_datetime'] : null,
            'end_datetime' => $validated['listing_type'] === 'TIME_BASED' ? $validated['end_datetime'] : null,
        ]);

        // Attach skills
        if (isset($validated['skills']) && is_array($validated['skills'])) {
            $listing->skills()->attach($validated['skills']);
        }

        // Create and attach custom skills
        if (isset($validated['custom_skills']) && is_array($validated['custom_skills'])) {
            foreach ($validated['custom_skills'] as $skillName) {
                $skill = \App\Models\Skill::firstOrCreate(['name' => $skillName]);
                $listing->skills()->attach($skill->id);
            }
        }

        return redirect()->route('business.listings.show', $listing)
            ->with('success', 'Lowongan berhasil dibuat!');
    }

    /**
     * Display the specified listing.
     */
    public function show(Request $request, Listing $listing): Response
    {
        if ($listing->business_profile_id !== $request->user()->businessProfile->id) {
            abort(403);
        }

        $listing->load(['skills', 'proposals.workerProfile.user']);

        return inertia('business/listings/show', [
            'listing' => $listing,
        ]);
    }

    /**
     * Show the form for editing the specified listing.
     */
    public function edit(Request $request, Listing $listing): Response
    {
        if ($listing->business_profile_id !== $request->user()->businessProfile->id) {
            abort(403);
        }

        $listing->load('skills');
        $skills = Skill::orderBy('name')->get();

        return inertia('business/listings/edit', [
            'listing' => $listing,
            'skills' => $skills,
        ]);
    }

    /**
     * Update the specified listing in storage.
     */
    public function update(Request $request, Listing $listing)
    {
        // Ensure the listing belongs to the authenticated business
        if ($listing->business_profile_id !== $request->user()->businessProfile->id) {
            abort(403);
        }

        $validated = $this->validateListing($request);

        // Update the listing
        $listing->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'listing_type' => $validated['listing_type'],

            // Project
            'project_budget_min' => $validated['listing_type'] === 'PROJECT' ? $validated['project_budget_min'] : null,
            'project_budget_max' => $validated['listing_type'] === 'PROJECT' ? $validated['project_budget_max'] : null,

            // Time-based
            'rate_type' => $validated['listing_type'] === 'TIME_BASED' ? $validated['rate_type'] : null,
            'rate_amount' => $validated['listing_type'] === 'TIME_BASED' ? $validated['rate_amount'] : null,
            'start_datetime' => $validated['listing_type'] === 'TIME_BASED' ? $validated['start_datetime'] : null,
            'end_datetime' => $validated['listing_type'] === 'TIME_BASED' ? $validated['end_datetime'] : null,
        ]);

        // Prepare skill IDs to sync
        $skillIds = isset($validated['skills']) && is_array($validated['skills']) ? $validated['skills'] : [];

        // Create and get IDs of custom skills
        if (isset($validated['custom_skills']) && is_array($validated['custom_skills'])) {
            foreach ($validated['custom_skills'] as $skillName) {
                $skill = \App\Models\Skill::firstOrCreate(['name' => $skillName]);
                $skillIds[] = $skill->id;
            }
        }

        // Sync all skills
        $listing->skills()->sync($skillIds);

        return redirect()->route('business.listings.show', $listing)
            ->with('success', 'Lowongan berhasil diperbarui!');
    }

    /**
     * Update the status of a listing.
     */
    public function updateStatus(Request $request, Listing $listing)
    {
        if ($listing->business_profile_id !== $request->user()->businessProfile->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:OPEN,IN_PROGRESS,COMPLETED,CANCELLED',
        ]);

        $listing->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Status lowongan berhasil diperbarui!');
    }

    /**
     * Validate the listing request.
     */
    private function validateListing(Request $request): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'listing_type' => 'required|in:PROJECT,TIME_BASED',
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',
            'custom_skills' => 'nullable|array',
            'custom_skills.*' => 'string|max:50',
        ];

        if ($request->input('listing_type') === 'PROJECT') {
            $rules = array_merge($rules, [
                'project_budget_min' => 'required|numeric|min:0',
                'project_budget_max' => 'required|numeric|gte:project_budget_min',
            ]);
        } else {
            $rules = array_merge($rules, [
                'rate_type' => 'required|in:HOURLY,DAILY,WEEKLY,MONTHLY',
                'rate_amount' => 'required|numeric|min:0',
                'start_datetime' => 'required|date',
                'end_datetime' => 'required|date|after:start_datetime',
            ]);
        }

        return $request->validate($rules);
    }
}