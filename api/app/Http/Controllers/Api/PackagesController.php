<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Packages;

class PackagesController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Packages::class, 'home');
    }
}