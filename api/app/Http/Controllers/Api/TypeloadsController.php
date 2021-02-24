<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Typeload;

class TypeloadsController extends ControllersExtends
{
    public function __construct()
    {
        parent::__construct(Typeload::class, 'home');
    }
}