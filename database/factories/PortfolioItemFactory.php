<?php

namespace Database\Factories;

use App\Models\WorkerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PortfolioItem>
 */
class PortfolioItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'worker_profile_id' => WorkerProfile::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraphs(2, true),
            'image_url' => fake()->imageUrl(),
            'project_link' => fake()->url(),
        ];
    }
} 