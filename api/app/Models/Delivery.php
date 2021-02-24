<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $table = "deliveries";

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


    public function collect()
    {
        return $this->hasOne(PackageStatus::class);
    }
    
    public function delivery()
    {
        return $this->hasOne(PackageStatus::class);
    }
}