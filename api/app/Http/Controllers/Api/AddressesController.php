<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Addresses;

class AddressesController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Addresses::class, 'home');
    }
}