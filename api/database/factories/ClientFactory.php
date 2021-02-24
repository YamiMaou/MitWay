<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Client;
use App\User;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
        return [
            'cnpj_cpf' => $faker->numerify('############'),                                               
            'company_name' => $faker->word,
            'fantasy_name' => $faker->word,
            'email' => $faker->email,
            'mob_phone' => $faker->phoneNumber,
            'phone' => $faker->phoneNumber,
            'user_id' => function () {
                return factory(User::class)->create()->id;
            }
    ];
});
