
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Driver;
use App\Models\Vehicle;
use Faker\Generator as Faker;

$factory->define(Vehicle::class, function (Faker $faker) {
        return [
            'type' => $faker->word,                                               
            'total_weight' => $faker->randomNumber(6),                                               
            'with' => $faker->randomNumber(4),
            'weight' => $faker->randomNumber(4),
            'length' => $faker->randomNumber(4),
            'truckbody' => $faker->text,
            'especial_package' => $faker->boolean(),
            'car_number' => $faker->word,
            'car_year' => $faker->randomNumber(4),
            'driver_id' => function () {
                return factory(Driver::class)->create()->id;
            }
    ];
});
