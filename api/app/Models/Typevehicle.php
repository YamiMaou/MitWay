<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Typevehicle extends Model
{
    protected $table = "typevehicles";

    protected $fillable = [
        'type',
        'code',
        'description'
    ];
}
