<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create reviews for completed listings
        Listing::where('status', 'COMPLETED')
            ->with(['businessProfile.user', 'assignments.workerProfile.user'])
            ->get()
            ->each(function ($listing) {
                $assignment = $listing->assignments->first();
                if (!$assignment) return;

                // Business owner reviews worker
                Review::factory()->create([
                    'listing_id' => $listing->id,
                    'reviewer_id' => $listing->businessProfile->user->id,
                    'reviewee_id' => $assignment->workerProfile->user->id,
                    'rating' => fake()->numberBetween(3, 5), // Bias towards positive ratings
                ]);

                // Worker reviews business owner
                Review::factory()->create([
                    'listing_id' => $listing->id,
                    'reviewer_id' => $assignment->workerProfile->user->id,
                    'reviewee_id' => $listing->businessProfile->user->id,
                    'rating' => fake()->numberBetween(3, 5), // Bias towards positive ratings
                ]);

                // Update worker's average rating
                $workerProfile = $assignment->workerProfile;
                $avgRating = Review::where('reviewee_id', $workerProfile->user_id)->avg('rating');
                $workerProfile->update([
                    'average_rating' => round($avgRating, 1),
                    'completed_projects_count' => $workerProfile->completed_projects_count + 1,
                ]);
            });
    }
} 