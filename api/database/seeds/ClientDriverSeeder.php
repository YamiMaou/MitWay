<?php

use Illuminate\Database\Seeder;

class ClientDriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(App\Models\ClientDriver::class, 7)->create();
    }
}
