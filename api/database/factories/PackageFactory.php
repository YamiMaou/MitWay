<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Packages;
use App\Models\Service;
use App\Models\Typeload;
use Faker\Generator as Faker;

$factory->define(Packages::class, function (Faker $faker) {
        return [
            'height' => $faker->word,                                               
            'width' => $faker->word,
            'depth' => $faker->text,
            'cubage' => $faker->text,
            'weight' => $faker->text,
            'price' => $faker->randomFloat(8, 2),
            'negotiable' => $faker->word,
            'fractionated' => $faker->word,
            'note' => $faker->text,
            'typeload_id' => function () {
                return factory(Typeload::class)->create()->id;
            },
            'service_id' => function () {
                return factory(Service::class)->create()->id;
            }
    ];
});
