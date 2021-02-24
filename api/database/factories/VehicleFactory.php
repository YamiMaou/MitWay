
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Driver;
use App\Models\Vehicle;
use Faker\Generator as Faker;

$factory->define(Vehicle::class, function (Faker $faker) {
        return [
            'type' => $faker->word,                                               
            'total_weight' => $faker->randomDigit,                                               
            'with' => $faker->randomDigit,
            'weight' => $faker->randomDigit,
            'length' => $faker->randomDigit,
            'truckbody' => $faker->word,
            'especial_package' => $faker->boolean(),
            'car_number' => $faker->word,
            'car_year' => $faker->randomDigit,
            'driver_id' => function () {
                return factory(Driver::class)->create()->id;
            }
    ];
});
