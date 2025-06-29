<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\Proposal;
use App\Models\WorkerProfile;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create proposals for open listings
        Listing::where('status', 'OPEN')->each(function ($listing) {
            // Get random worker profiles that have at least one matching skill
            $matchingWorkers = WorkerProfile::whereHas('skills', function ($query) use ($listing) {
                $query->whereIn('skills.id', $listing->skills->pluck('id'));
            })->inRandomOrder()->take(rand(1, 3))->get();

            // Create proposals for each matching worker
            $matchingWorkers->each(function ($worker) use ($listing) {
                $status = fake()->randomElement(['SENT', 'VIEWED']);
                
                // 30% chance for a proposal to be accepted/rejected if it was viewed
                if ($status === 'VIEWED' && rand(0, 100) > 70) {
                    $status = fake()->randomElement(['ACCEPTED', 'REJECTED']);
                }

                Proposal::factory()->create([
                    'listing_id' => $listing->id,
                    'worker_profile_id' => $worker->id,
                    'status' => $status,
                ]);
            });
        });
    }
} 