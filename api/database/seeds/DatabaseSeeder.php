<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersSeeder::class, 
            ServiceSeeder::class,
            TypeloadSeeder::class,
            PackageSeeder::class,
            DriverSeeder::class,
            VehicleSeeder::class,
            DriverQualificationSeeder::class,
            ClientSeeder::class,
            ClientDriverSeeder::class,
            CollectSeeder::class,
            DeliverySeeder::class,
            PackageStatusSeeder::class,
            AddressesSeeder::class
        ]);
        //$this->call(PostsTableSeeder::class);
    }
}
