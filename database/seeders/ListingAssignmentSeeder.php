<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingAssignment;
use App\Models\Proposal;
use Illuminate\Database\Seeder;

class ListingAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create assignments for accepted proposals
        Proposal::where('status', 'ACCEPTED')
            ->get()
            ->each(function ($proposal) {
                $status = fake()->randomElement(['ACTIVE', 'COMPLETED']);
                $unassignedAt = null;
                $reason = null;

                // 20% chance for assignment to be cancelled or replaced
                if (rand(0, 100) > 80) {
                    $status = fake()->randomElement(['CANCELLED', 'REPLACED']);
                    $reason = $status === 'CANCELLED' 
                        ? fake()->randomElement([
                            'Worker unavailable',
                            'Project cancelled by client',
                            'Mutual agreement to terminate',
                            'Unsatisfactory performance',
                        ])
                        : 'Replaced with another worker';
                }

                ListingAssignment::factory()->create([
                    'listing_id' => $proposal->listing_id,
                    'worker_profile_id' => $proposal->worker_profile_id,
                    'status' => $status,
                    'reason_for_unassignment' => $reason,
                ]);

                // Update the listing status
                if ($status === 'ACTIVE') {
                    $proposal->listing->update(['status' => 'IN_PROGRESS']);
                } elseif ($status === 'COMPLETED') {
                    $proposal->listing->update(['status' => 'COMPLETED']);
                }
            });
    }
} 