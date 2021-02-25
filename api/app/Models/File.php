<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = "files";

    protected $fillable = [
        'title',
        'name',
        'path',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
