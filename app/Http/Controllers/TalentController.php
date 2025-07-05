<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\WorkerProfile;
use Illuminate\Http\Request;
use Inertia\Response;

class TalentController extends Controller
{
    /**
     * Display a listing of available talents.
     */
    public function index(Request $request): Response
    {
        $query = WorkerProfile::query()
            ->with(['user', 'skills']);

        if ($request->has('search') && $request->input('search') !== null) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('bio', 'ILIKE', "%{$search}%")
                    ->orWhere('location', 'ILIKE', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'ILIKE', "%{$search}%");
                    });
            });
        }

        if ($request->has('skills') && $request->input('skills') !== null) {
            $skillIds = explode(',', $request->input('skills'));
            $query->whereHas('skills', function ($q) use ($skillIds) {
                $q->whereIn('skills.id', $skillIds);
            });
        }

        if ($request->has('min_rating') && $request->input('min_rating') !== null) {
            $query->where('average_rating', '>=', $request->input('min_rating'));
        }

        $sort = $request->input('sort', 'rating');
        switch ($sort) {
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'experience':
                $query->orderBy('completed_projects_count', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            default:
                $query->orderBy('average_rating', 'desc');
                break;
        }

        $talents = $query->paginate(12)->withQueryString();
        $skills = Skill::orderBy('name')->get();

        return inertia('talents/index', [
            'talents' => $talents,
            'skills' => $skills,
            'filters' => [
                'search' => $request->input('search'),
                'skills' => $request->input('skills'),
                'min_rating' => $request->input('min_rating'),
                'sort' => $request->input('sort'),
            ],
        ]);
    }

    /**
     * Display the specified talent profile.
     */
    public function show(WorkerProfile $talent): Response
    {
        $talent->load(['user', 'skills', 'portfolioItems']);

        $similarTalents = WorkerProfile::where('id', '!=', $talent->id)
            ->whereHas('skills', function ($query) use ($talent) {
                $query->whereIn('skills.id', $talent->skills->pluck('id'));
            })
            ->with(['user', 'skills'])
            ->take(3)
            ->get();

        return inertia('talents/show', [
            'talent' => $talent,
            'similarTalents' => $similarTalents,
        ]);
    }
}