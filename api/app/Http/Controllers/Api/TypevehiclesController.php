<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Typevehicle;

class TypevehiclesController extends ControllersExtends
{
    public function __construct()
    {
        parent::__construct(Typevehicle::class, 'home');
    }
}
