<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $table = "drivers";

    protected $fillable = [
        'cnh',
        'fullname',
        'cpf_cnpj',
        'birthdate',
        'email',
        'mob_phone',
        'phone',
        'package_id',
        'address_id'
    ];

    public function qualifications()
    {
        return $this->belongsToMany(Qualification::class, 'driver_qualifications', 'driver_id', 'qualification_id');
    }
}