<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Typeload extends Model
{
    protected $table = "typeloads";

    protected $fillable = [
        'type',
        'code',
        'description'
    ];
}