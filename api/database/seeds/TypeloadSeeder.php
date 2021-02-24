<?php

use Illuminate\Database\Seeder;

class TypeloadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(App\Models\Typeload::class, 7)->create();
    }
}
