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
        'address_id',
        'service_id'
    ];

    public function qualifications()
    {
        return $this->hasMany(Qualification::class, 'driver_qualifications', 'driver_id', 'qualification_id');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'client_drivers', 'driver_id' ,'client_id');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}