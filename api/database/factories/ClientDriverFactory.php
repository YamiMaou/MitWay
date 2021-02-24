<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Client;
use App\Models\ClientDriver;
use App\Models\Driver;
use Faker\Generator as Faker;

$factory->define(ClientDriver::class, function (Faker $faker) {
        return [
            'client_id' => function () {
                return factory(Client::class)->create()->id;
            },
            'driver_id' => function () {
                return factory(Driver::class)->create()->id;
            }
    ];
});