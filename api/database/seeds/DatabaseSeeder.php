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
<<<<<<< HEAD
            \UsersSeeder::class, 
=======
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
>>>>>>> ae3115c54c561821eb3d7d6b8d0b329061c60020
        ]);
        //$this->call(PostsTableSeeder::class);
    }
}
