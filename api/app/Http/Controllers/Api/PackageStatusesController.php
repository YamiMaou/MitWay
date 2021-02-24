<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\PackageStatus;

class PackageStatusesController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(PackageStatus::class, 'home');
    }
}