<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some predefined skills
        $predefinedSkills = [
            'UI/UX Design',
            'Content Writing',
            'Digital Marketing',
            'Mobile Development',
            'Project Management',
            'Web Development',
            'Graphic Design',
            'Video Editing',
            'Social Media Management',
            'SEO Optimization',
            'Copywriting',
            'Waiter',
            'Cook',
            'Driver',
            'Cleaner',
            'Gardener',
            'Electrician',
        ];

        foreach ($predefinedSkills as $skill) {
            Skill::factory()->create(['name' => $skill]);
        }

        // Create some random skills
        Skill::factory()->count(10)->create();
    }
} 