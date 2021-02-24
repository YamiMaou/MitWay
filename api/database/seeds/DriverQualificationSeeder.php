<?php

use Illuminate\Database\Seeder;

class DriverQualificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(App\Models\DriverQualification::class, 7)->create();
    }
}
