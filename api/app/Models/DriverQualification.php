<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverQualification extends Model
{
    protected $table = "driver_qualifications";

    protected $fillable = [
        'driver_id',
        'qualification_id',
    ];
}