<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageStatus extends Model
{
    protected $table = "package_statuses";

    protected $fillable = [
        'flag',
        'collect_id',
        'delivery_id'
    ];

    public function collect()
    {
        return $this->belongsTo(Collect::class);
    }

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }
}
