<?php

namespace App\Models;

use App\User;
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
        'service_id',
        'user_id',
        'file_crlv',
        'file_cnh'
    ];

    public function qualifications()
    {
        return $this->hasMany(Qualification::class, 'driver_qualifications', 'driver_id', 'qualification_id');
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'client_drivers', 'driver_id' ,'client_id');
    }

    public function files_cnh()
    {
        return $this->hasOne(File::class, 'id', 'file_cnh');
    }

    public function files_crlv()
    {
        return $this->hasOne(File::class, 'id', 'file_crlv');
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
        return $this->hasOne(User::class,'id', 'user_id');
    }

    public function addresses()
    {
        return $this->hasOne(Addresses::class,'driver_id', 'id');
    }
}