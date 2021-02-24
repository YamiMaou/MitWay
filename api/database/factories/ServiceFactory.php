<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Service;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
        return [
            'type' => $faker->word,                                               
            'name' => $faker->word,
            'description' => $faker->text,
            
    ];
});
