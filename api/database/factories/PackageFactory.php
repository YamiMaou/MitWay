<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Packages;
use App\Models\Service;
use App\Models\Typeload;
use Faker\Generator as Faker;

$factory->define(Packages::class, function (Faker $faker) {
        return [
            'height' => $faker->randomDigit,                                               
            'width' => $faker->randomDigit,
            'depth' => $faker->randomDigit,
            'cubage' => $faker->randomDigit,
            'weight' => $faker->randomDigit,
            'price' => $faker->randomDigit,
            'negotiable' => $faker->boolean(),
            'fractionated' => $faker->boolean(),
            'note' => $faker->word,
            'typeload_id' => function () {
                return factory(Typeload::class)->create()->id;
            },
            'service_id' => function () {
                return factory(Service::class)->create()->id;
            }
    ];
});
