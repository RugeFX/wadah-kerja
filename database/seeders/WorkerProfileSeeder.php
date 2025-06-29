<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\User;
use App\Models\WorkerProfile;
use Illuminate\Database\Seeder;

class WorkerProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create worker profiles for some existing users
        User::whereDoesntHave('workerProfile')
            ->take(8)
            ->get()
            ->each(function (User $user) {
                $workerProfile = WorkerProfile::factory()->create([
                    'user_id' => $user->id,
                    'profile_picture_url' => 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random',
                ]);

                // Attach random skills to each worker profile
                $skills = Skill::inRandomOrder()->take(rand(2, 5))->get();
                $workerProfile->skills()->attach($skills);
            });

        // Create some new users with worker profiles
        WorkerProfile::factory()
            ->count(15)
            ->create()
            ->each(function (WorkerProfile $workerProfile) {
                // Set a default profile picture
                $workerProfile->update([
                    'profile_picture_url' => 'https://ui-avatars.com/api/?name=' . urlencode($workerProfile->headline) . '&background=random',
                ]);

                // Attach random skills to each worker profile
                $skills = Skill::inRandomOrder()->take(rand(2, 5))->get();
                $workerProfile->skills()->attach($skills);
            });
    }
} 