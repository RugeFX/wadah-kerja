<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\WorkerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ListingAssignment>
 */
class ListingAssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['ACTIVE', 'REPLACED', 'COMPLETED', 'CANCELLED']);
        $assignedAt = fake()->dateTimeBetween('-1 month', 'now');

        return [
            'listing_id' => Listing::factory(),
            'worker_profile_id' => WorkerProfile::factory(),
            'status' => $status,
            'assigned_at' => $assignedAt,
            'unassigned_at' => $status !== 'ACTIVE' 
                ? fake()->dateTimeBetween($assignedAt, 'now')
                : null,
            'reason_for_unassignment' => $status !== 'ACTIVE'
                ? fake()->sentence()
                : null,
        ];
    }
} 