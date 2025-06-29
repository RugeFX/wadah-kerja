<?php

namespace Database\Seeders;

use App\Models\BusinessProfile;
use App\Models\User;
use Illuminate\Database\Seeder;

class BusinessProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create business profiles for some existing users
        User::whereDoesntHave('businessProfile')
            ->take(5)
            ->get()
            ->each(function ($user) {
                BusinessProfile::factory()->create([
                    'user_id' => $user->id,
                    'profile_picture_url' => 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random',
                ]);
            });

        // Create some new users with business profiles
        BusinessProfile::factory()
            ->count(10)
            ->create()
            ->each(function ($profile) {
                $profile->update([
                    'profile_picture_url' => 'https://ui-avatars.com/api/?name=' . urlencode($profile->company_name) . '&background=random',
                ]);
            });
    }
} 