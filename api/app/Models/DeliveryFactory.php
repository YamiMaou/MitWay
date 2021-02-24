<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Delivery;
use App\Models\Packages;
use Faker\Generator as Faker;

$factory->define(Delivery::class, function (Faker $faker) {
        return [
            'hour' => $faker->time(),                                               
            'date' => $faker->date(), 
            'package_id' => function () {
                return factory(Packages::class)->create()->id;
            }
    ];
});