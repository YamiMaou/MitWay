<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Collect;
use App\Models\Delivery;
use App\Models\PackageStatus;
use Faker\Generator as Faker;

$factory->define(PackageStatus::class, function (Faker $faker) {
        return [
            'flag' => $faker->time(),                                               
            'collect_id' => function () {
                return factory(Collect::class)->create()->id;
            },
            'delivery_id' => function () {
                return factory(Delivery::class)->create()->id;
            }
    ];
});