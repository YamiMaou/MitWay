<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Collect;
use App\Models\Packages;
use Faker\Generator as Faker;

$factory->define(Collect::class, function (Faker $faker) {
        return [
            'hour' => $faker->time(),                                               
            'date' => $faker->date(), 
            'package_id' => function () {
                return factory(Packages::class)->create()->id;
            }
    ];
});