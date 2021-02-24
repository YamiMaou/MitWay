<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collect extends Model
{
    protected $table = "collects";

    protected $fillable = [
        'hour',
        'date',
        'package_id'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function address()
    {
        return $this->hasOne(Addresses::class);
    }
}