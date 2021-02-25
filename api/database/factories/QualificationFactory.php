<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Qualification;
use Faker\Generator as Faker;

$factory->define(Qualification::class, function (Faker $faker) {
        return [
            'title' => $faker->word,
            'description' => $faker->word
    ];
});