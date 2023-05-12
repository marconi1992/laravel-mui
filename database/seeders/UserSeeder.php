<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => "Felipe",
            "last_name" => "Guizar Diaz",
            'email' => 'felipegaiacharly@gmail.com',
            'password' => Hash::make('admin'),
            'email_verified_at' => Carbon::now(),
            'is_admin' => true,
        ]);
    }
}
