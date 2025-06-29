<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkerProfile>
 */
class WorkerProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'headline' => fake()->jobTitle(),
            'bio' => fake()->paragraph(),
            'location' => fake()->city() . ', ' . fake()->country(),
            'profile_picture_url' => fake()->imageUrl(),
            'average_rating' => fake()->randomFloat(1, 0, 5),
            'completed_projects_count' => fake()->numberBetween(0, 50),
        ];
    }
} 