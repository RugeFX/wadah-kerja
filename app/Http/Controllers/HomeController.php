<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index(): Response
    {
        $popularSkills = Skill::withCount('listings')
            ->orderByDesc('listings_count')
            ->limit(6)
            ->get()
            ->map(fn($skill) => [
                'id' => $skill->id,
                'name' => $skill->name,
                'count' => $skill->listings_count,
            ])
            ->toArray();

        return inertia('home', [
            'popularSkills' => $popularSkills,
        ]);
    }
}