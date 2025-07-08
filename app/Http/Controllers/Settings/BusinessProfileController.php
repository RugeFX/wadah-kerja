<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BusinessProfileController extends Controller
{
    /**
     * Show the business profile settings page.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $businessProfile = $user->businessProfile()->first();

        return inertia('settings/business-profile', [
            'businessProfile' => $businessProfile,
        ]);
    }

    /**
     * Update the business profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        $user = $request->user();
        $businessProfile = $user->businessProfile;

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if it exists
            if ($businessProfile->profile_picture_url && !str_contains($businessProfile->profile_picture_url, 'ui-avatars.com')) {
                $oldPath = str_replace('/storage/', '', $businessProfile->profile_picture_url);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            // Store new profile picture
            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            $validated['profile_picture_url'] = '/storage/' . $path;
        }

        // Remove the profile_picture key as it's not in the database
        if (isset($validated['profile_picture'])) {
            unset($validated['profile_picture']);
        }

        $businessProfile->update($validated);

        return redirect()->route('business-profile.edit')->with('success', 'Business profile updated successfully.');
    }
}