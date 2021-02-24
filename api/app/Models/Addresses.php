<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    protected $table = "addresses";

    protected $fillable = [
        'zipcode',
        'street',
        'number',
        'additional',
        'city',
        'uf',
        'driver_id',
        'client_id',
        'collect_id',
        'delivery_id',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function collect()
    {
        return $this->belongsTo(Collect::class);
    }

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }
}