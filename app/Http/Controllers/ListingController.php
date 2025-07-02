<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Response;

class ListingController extends Controller
{
    /**
     * Display a listing of available jobs.
     */
    public function index(Request $request): Response
    {
        $query = Listing::query()
            ->where('status', 'OPEN')
            ->with(['businessProfile', 'skills']);

        if ($request->has('search') && $request->input('search') !== null) {
            $search = $request->input(key: 'search');

            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                    ->orWhere('description', 'ILIKE', "%{$search}%")
                    ->orWhereHas('businessProfile', function ($q) use ($search) {
                        $q->where('company_name', 'ILIKE', "%{$search}%")
                            ->orWhere('location', 'ILIKE', "%{$search}%");
                    });
            });
        }

        if ($request->has('type') && $request->input('type') !== null) {
            $query->where('listing_type', $request->input('type'));
        }

        if ($request->has('skills') && $request->input('skills') !== null) {
            $skillIds = explode(',', $request->input('skills'));
            $query->whereHas('skills', function ($q) use ($skillIds) {
                $q->whereIn('skills.id', $skillIds);
            });
        }

        if ($request->has('min_budget') && $request->input('min_budget') !== null) {
            $query->where(function ($q) use ($request) {
                $q->where('project_budget_min', '>=', $request->input('min_budget'))
                    ->orWhere('rate_amount', '>=', $request->input('min_budget'));
            });
        }

        if ($request->has('max_budget') && $request->input('max_budget') !== null) {
            $query->where(function ($q) use ($request) {
                $q->where('project_budget_max', '<=', $request->input('max_budget'))
                    ->orWhere('rate_amount', '<=', $request->input('max_budget'));
            });
        }

        $sort = $request->input('sort', 'latest');
        switch ($sort) {
            case 'budget_high':
                $query->orderByRaw('COALESCE(project_budget_max, rate_amount) DESC');
                break;
            case 'budget_low':
                $query->orderByRaw('COALESCE(project_budget_min, rate_amount) ASC');
                break;
            default:
                $query->latest();
                break;
        }

        $listings = $query->paginate(12)->withQueryString();
        $skills = Skill::orderBy('name')->get();

        return inertia('listings/index', [
            'listings' => $listings,
            'skills' => $skills,
            'filters' => [
                'search' => $request->input('search'),
                'type' => $request->input('type'),
                'skills' => $request->input('skills'),
                'min_budget' => $request->input('min_budget'),
                'max_budget' => $request->input('max_budget'),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Display the specified job listing.
     */
    public function show(Listing $listing): Response
    {
        $listing->load(['businessProfile', 'skills', 'proposals.workerProfile.user']);

        $similarListings = Listing::where('id', '!=', $listing->id)
            ->where('status', 'OPEN')
            ->whereHas('skills', function ($query) use ($listing) {
                $query->whereIn('skills.id', $listing->skills->pluck('id'));
            })
            ->with(['businessProfile', 'skills'])
            ->take(3)
            ->get();

        return inertia('listings/show', [
            'listing' => $listing,
            'similarListings' => $similarListings,
        ]);
    }
}