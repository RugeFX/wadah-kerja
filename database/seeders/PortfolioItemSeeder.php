<?php

namespace Database\Seeders;

use App\Models\PortfolioItem;
use App\Models\WorkerProfile;
use Illuminate\Database\Seeder;

class PortfolioItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create portfolio items for each worker profile
        WorkerProfile::all()->each(function ($workerProfile) {
            PortfolioItem::factory()
                ->count(rand(2, 5))
                ->create([
                    'worker_profile_id' => $workerProfile->id,
                    'image_url' => 'https://picsum.photos/seed/' . fake()->unique()->word() . '/800/600',
                ]);
        });
    }
} 