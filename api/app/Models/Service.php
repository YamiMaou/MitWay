<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = "clients";

    protected $fillable = [
        'type',
        'name',
        'description'
    ];

    public function driver()
    {
        return $this->HasOne(Driver::class);
    }

    public function packages()
    {
        return $this->hasMany(Package::class);
    }
}