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
        $password = Hash::make('zacky123');

        User::factory()->create([
            'name' => 'Ahmad Zacky',
            'email' => 'zacky@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::ADMIN);

        User::factory()->create([
            'name' => 'Ahmad Zacky',
            'email' => 'worker@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::WORKER);

        User::factory()->create([
            'name' => 'Ahmad Zacky',
            'email' => 'business@rugefx.com',
            'password' => $password,
        ])->assignRole(\App\Enums\RolesEnum::BUSINESS);
    }
}
