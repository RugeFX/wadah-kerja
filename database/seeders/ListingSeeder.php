<?php

namespace Database\Seeders;

use App\Models\BusinessProfile;
use App\Models\Listing;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create listings for each business profile
        BusinessProfile::all()->each(function ($businessProfile) {
            $listingsCount = rand(1, 4);
            
            Listing::factory()
                ->count($listingsCount)
                ->create([
                    'business_profile_id' => $businessProfile->id,
                    'status' => 'OPEN', // Start all listings as OPEN
                ])
                ->each(function (Listing $listing) {
                    // Attach random skills to each listing
                    $skills = Skill::inRandomOrder()->take(rand(2, 4))->get();
                    $listing->skills()->attach($skills);

                    // For some listings, mark them as in progress or completed
                    if (rand(0, 100) > 70) { // 30% chance
                        $listing->update([
                            'status' => rand(0, 1) ? 'IN_PROGRESS' : 'COMPLETED'
                        ]);
                    }
                });
        });
    }
} 