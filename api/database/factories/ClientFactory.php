<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Service;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
        return [
            'cnpj_cpf' => $faker->numerify('############'),                                               
            'company_name' => $faker->word,
            'fantasy_name' => $faker->word,
            'email' => $faker->email,
            'mob_phone' => $faker->phoneNumber,
            'phone' => $faker->phoneNumber,
    ];
});
