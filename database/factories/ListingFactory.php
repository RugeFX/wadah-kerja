<?php

namespace Database\Factories;

use App\Models\BusinessProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isProject = fake()->boolean(70); // 70% chance of being a project-based listing
        $rateTypes = ['HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY'];

        return [
            'business_profile_id' => BusinessProfile::factory(),
            'listing_type' => $isProject ? 'PROJECT' : 'TIME_BASED',
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraphs(3, true),
            'project_budget_min' => $isProject ? fake()->numberBetween(1000000, 5000000) : null,
            'project_budget_max' => function (array $attributes) {
                return $attributes['project_budget_min'] 
                    ? fake()->numberBetween($attributes['project_budget_min'], $attributes['project_budget_min'] * 2)
                    : null;
            },
            'rate_type' => $isProject ? null : fake()->randomElement($rateTypes),
            'rate_amount' => function (array $attributes) {
                if (!$attributes['rate_type']) return null;
                return match($attributes['rate_type']) {
                    'HOURLY' => fake()->numberBetween(50000, 500000),
                    'DAILY' => fake()->numberBetween(400000, 4000000),
                    'WEEKLY' => fake()->numberBetween(2000000, 20000000),
                    'MONTHLY' => fake()->numberBetween(8000000, 80000000),
                    default => null
                };
            },
            'start_datetime' => fn (array $attributes) => !$attributes['listing_type'] === 'PROJECT' 
                    ? fake()->dateTimeBetween('now', '+2 months') 
                    : null,
            'end_datetime' => fn (array $attributes)  => $attributes['start_datetime']
                    ? fake()->dateTimeBetween($attributes['start_datetime'], '+6 months')
                    : null
            ,
            'status' => fake()->randomElement(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
        ];
    }
} 