<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Service;
use Faker\Generator as Faker;

$factory->define(Driver::class, function (Faker $faker) {
        return [
            'cnh' => $faker->numerify('###########'),                                               
            'fullname' => $faker->name(),
            'cpf_cnpj' => $faker->numerify('###########'),
            'birthdate' => $faker->date(),
            'email' => $faker->email,
            'mob_phone' => $faker->phoneNumber,
            'phone' => $faker->phoneNumber,
            'fractionated' => $faker->word,
            'note' => $faker->text,
            'service_id' => function () {
                return factory(Service::class)->create()->id;
            }
    ];
});
