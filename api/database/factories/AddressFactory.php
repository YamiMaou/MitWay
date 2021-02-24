
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Addresses;
use App\Models\Client;
use App\Models\Collect;
use App\Models\Delivery;
use App\Models\Driver;
use Faker\Generator as Faker;

$factory->define(Addresses::class, function (Faker $faker) {
        return [
            'zipcode' => $faker->numerify('########'),                                               
            'street' => $faker->streetName,                                               
            'number' => $faker->randomNumber(4),
            'additional' => $faker->text,
            'city' => $faker->city,
            'uf' => $faker->word,
            'driver_id' => function () {
                return factory(Driver::class)->create()->id;
            },
            'client_id' => function () {
                return factory(Client::class)->create()->id;
            },
            'collect_id' => function () {
                return factory(Collect::class)->create()->id;
            },
            'delivery_id' => function () {
                return factory(Delivery::class)->create()->id;
            },
    ];
});
