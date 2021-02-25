<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = "vehicles";

    protected $fillable = [
        'type',
        'total_weight',
        'weight',
        'weight',
        'length',
        'truckbody',
        'especial_package',
        'car_number',
        'car_year',
        'driver_id',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
