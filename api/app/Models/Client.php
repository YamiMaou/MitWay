<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = "clients";

    protected $fillable = [
        'cnpj_cpf',
        'company_name',
        'fantasy_name',
        'email',
        'email',
        'mob_phone',
        'phone',
        'user_id',
        'file_cnh'
    ];

    public function files_cnh()
    {
        return $this->hasOne(File::class, 'id', 'file_cnh');
    }

    public function packages()
    {
        return $this->hasMany(packages::class);
    }

    public function drivers()
    {
        return $this->hasMany(Driver::class, 'client_drivers', 'client_id', 'driver_id');
    }

    public function addresses()
    {
        return $this->hasOne(Addresses::class,'client_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}