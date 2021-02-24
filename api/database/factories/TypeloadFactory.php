<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Typeload;
use Faker\Generator as Faker;

$factory->define(Typeload::class, function (Faker $faker) {
        return [
            'type' => $faker->word,                                               
            'code' => $faker->word,
            'description' => $faker->text,
            
    ];
});