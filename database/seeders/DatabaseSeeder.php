<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            SkillSeeder::class,
            BusinessProfileSeeder::class,
            WorkerProfileSeeder::class,
            ListingSeeder::class,
            ProposalSeeder::class,
            ListingAssignmentSeeder::class,
            PortfolioItemSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
