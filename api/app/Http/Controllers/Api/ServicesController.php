<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Service;

class ServicesController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Service::class, 'home');
    }
}