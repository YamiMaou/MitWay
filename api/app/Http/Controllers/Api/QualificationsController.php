<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Qualification;

class QualificationsController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Qualification::class, 'home');
    }
}