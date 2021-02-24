<?php

namespace App\Http\Controllers\Api;

use App\Extensions\ControllersExtends;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehiclesController extends ControllersExtends
{
    public function __construct()
    {
        parent::__construct(Vehicle::class, 'home');
    }
}
