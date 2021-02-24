<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Packages extends Model
{
    protected $table = "packages";

    /** cubage = volume da carga */
    protected $fillable = [
        'height',
        'width',
        'depth',
        'cubage',
        'weight',
        'price',
        'negotiable',
        'fractionated',
        'typeload_id',
        'service_id'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function collect()
    {
        return $this->hasOne(Collect::class);
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}