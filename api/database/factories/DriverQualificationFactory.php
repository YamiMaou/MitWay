<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Driver;
use App\Models\DriverQualification;
use App\Models\Qualification;
use Faker\Generator as Faker;

$factory->define(DriverQualification::class, function (Faker $faker) {
        return [
            'driver_id' => function () {
                return factory(Driver::class)->create()->id;
            },
            'qualification_id' => function () {
                return factory(Qualification::class)->create()->id;
            }
    ];
});
