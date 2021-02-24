<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientDriver extends Model
{
    protected $table = "client_drivers";

    protected $fillable = [
        'client_id',
        'driver_id',
    ];
}
