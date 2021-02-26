<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Qualification extends Model
{
    protected $table = "qualifications";

    protected $fillable = [
        'title',
        'description',
    ];

    public function drivers()
    {
        return $this->belongsToMany(Driver::class, 'driver_qualifications', 'qualification_id', 'driver_id');
    }
}
