<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Collect;

class CollectsController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Collect::class, 'home');
    }
}