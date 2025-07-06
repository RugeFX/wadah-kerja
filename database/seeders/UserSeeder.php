<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('password123');

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::ADMIN);

        User::factory()->create([
            'name' => 'Worker',
            'email' => 'worker@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::WORKER);

        User::factory()->create([
            'name' => 'Business',
            'email' => 'business@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::BUSINESS);
    }
}
