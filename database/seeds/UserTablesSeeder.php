<?php

use Illuminate\Database\Seeder;
use App\User;
use \Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create([
            'name'              =>  "Jhon Smith",
            'email'             =>  "jhon_smith@gmail.com",
            'password'          =>  Hash::make("password"),
            'remember_token'    =>  Str::random(10)
        ]);
    }
}
