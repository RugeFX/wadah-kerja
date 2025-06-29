<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\WorkerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'listing_id' => Listing::factory(),
            'worker_profile_id' => WorkerProfile::factory(),
            'cover_letter' => fake()->paragraphs(2, true),
            'status' => fake()->randomElement(['SENT', 'VIEWED', 'ACCEPTED', 'REJECTED']),
        ];
    }
} 