<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Extensions\ControllersExtends;
use App\Models\Client;

class ClientsController extends controllersExtends
{
    public function __construct()
    {
        parent::__construct(Client::class, 'home');
    }
}