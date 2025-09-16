<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $this->call(LaratrustSeeder::class);
        
        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin123'),
        ]);
        $user->addRole('admin');

        $user = User::factory()->create([
            'name' => 'manager',
            'email' => 'manager@manager.com',
            'password' => bcrypt('manager123'),
        ]);
        $user->addRole('manager');

    }
}
