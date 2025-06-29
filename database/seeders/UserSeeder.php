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
        User::factory()->create([
            'name' => 'Ahmad Zacky',
            'email' => 'zacky@rugefx.com',
            'password' => Hash::make('zacky123'),
        ])->assignRole(\App\Enums\RolesEnum::ADMIN);
    }
}
