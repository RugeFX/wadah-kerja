<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkerProfileController extends Controller
{
    /**
     * Show the worker profile settings page.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $workerProfile = $user->workerProfile()->with(['skills', 'portfolioItems'])->first();
        $skills = Skill::orderBy('name')->get();

        return inertia('settings/worker-profile', [
            'workerProfile' => $workerProfile,
            'skills' => $skills,
        ]);
    }

    /**
     * Update the worker profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $workerProfile = $user->workerProfile;

        if (!$workerProfile) {
            return redirect()->back()->withErrors(['error' => 'Worker profile not found']);
        }

        $validated = $request->validate([
            'headline' => ['required', 'string', 'max:255'],
            'bio' => ['required', 'string', 'max:1000'],
            'location' => ['required', 'string', 'max:255'],
            'skill_ids' => ['array'],
            'skill_ids.*' => ['exists:skills,id'],
            'custom_skills' => ['array'],
            'custom_skills.*' => ['string', 'max:255'],
        ]);

        $workerProfile->update([
            'headline' => $validated['headline'],
            'bio' => $validated['bio'],
            'location' => $validated['location'],
        ]);

        if ($request->hasFile('profile_picture')) {
            $request->validate([
                'profile_picture' => ['image', 'max:2048'],
            ]);

            if ($workerProfile->profile_picture_url && !str_contains($workerProfile->profile_picture_url, 'ui-avatars.com')) {
                Storage::disk('public')->delete($workerProfile->profile_picture_url);
            }

            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            $workerProfile->update([
                'profile_picture_url' => Storage::url($path),
            ]);
        }

        if (isset($validated['skill_ids'])) {
            $workerProfile->skills()->sync($validated['skill_ids']);
        }

        if (isset($validated['custom_skills'])) {
            foreach ($validated['custom_skills'] as $skillName) {
                $skill = Skill::firstOrCreate(['name' => $skillName]);
                if (!$workerProfile->skills->contains($skill->id)) {
                    $workerProfile->skills()->attach($skill->id);
                }
            }
        }

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    /**
     * Store a new portfolio item.
     */
    public function storePortfolioItem(Request $request): RedirectResponse
    {
        $user = $request->user();
        $workerProfile = $user->workerProfile;

        if (!$workerProfile) {
            return redirect()->back()->withErrors(['error' => 'Worker profile not found']);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'project_link' => ['nullable', 'url', 'max:255'],
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $path = $request->file('image')->store('portfolio-images', 'public');

        PortfolioItem::create([
            'worker_profile_id' => $workerProfile->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_link' => $validated['project_link'] ?? null,
            'image_url' => Storage::url($path),
        ]);

        return redirect()->back()->with('success', 'Portfolio item added successfully');
    }

    /**
     * Update an existing portfolio item.
     */
    public function updatePortfolioItem(Request $request, PortfolioItem $portfolioItem): RedirectResponse
    {
        $user = $request->user();
        $workerProfile = $user->workerProfile;

        if (!$workerProfile || $portfolioItem->worker_profile_id !== $workerProfile->id) {
            return redirect()->back()->withErrors(['error' => 'Portfolio item not found']);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'project_link' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            if ($portfolioItem->image_url) {
                $oldPath = str_replace('/storage/', '', $portfolioItem->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('portfolio-images', 'public');
            $portfolioItem->image_url = Storage::url($path);
        }

        $portfolioItem->title = $validated['title'];
        $portfolioItem->description = $validated['description'] ?? null;
        $portfolioItem->project_link = $validated['project_link'] ?? null;
        $portfolioItem->save();

        return redirect()->back()->with('success', 'Portfolio item updated successfully');
    }

    /**
     * Delete a portfolio item.
     */
    public function destroyPortfolioItem(PortfolioItem $portfolioItem, Request $request): RedirectResponse
    {
        $user = $request->user();
        $workerProfile = $user->workerProfile;

        if (!$workerProfile || $portfolioItem->worker_profile_id !== $workerProfile->id) {
            return redirect()->back()->withErrors(['error' => 'Portfolio item not found']);
        }

        if ($portfolioItem->image_url) {
            $path = str_replace('/storage/', '', $portfolioItem->image_url);
            Storage::disk('public')->delete($path);
        }

        $portfolioItem->delete();

        return redirect()->back()->with('success', 'Portfolio item deleted successfully');
    }
}