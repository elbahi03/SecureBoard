<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        // Create Admin User
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@app.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('12345678'),
            ]
        );
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminUser->addRole($adminRole);
        }

        // Create Manager User
        $managerUser = User::firstOrCreate(
            ['email' => 'manager@app.com'],
            [
                'name' => 'Manager',
                'password' => Hash::make('12345678'),
            ]
        );
        $managerRole = Role::where('name', 'manager')->first();
        if ($managerRole) {
            $managerUser->addRole($managerRole);
        }
    }
}
