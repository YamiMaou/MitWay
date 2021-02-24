<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Delivery;

class DeliveriesController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Delivery::class, 'home');
    }
}