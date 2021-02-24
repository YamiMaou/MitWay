<?php

namespace App\Http\Controllers\Api;

use App\Extensions\ControllersExtends;
use App\Models\Client;
use Illuminate\Http\Request as Req;
use Illuminate\Support\Facades\Hash;

class ClientsController extends ControllersExtends
{
    public function __construct()
    {
        parent::__construct(Client::class, 'home');
    }

    public function show(Req $request, $id, $with=[])
    {
       return  parent::show($request, $id, ['user', 'addresses']);
    }

    public function update(Req $request, $id)
    {
        $drivers = [
            "cpf_cnpj" => $request->cpf_cnpj,
            "fullname" => $request->fullname,
            "birthdate"=> $request->birthdate,
            "mob_phone"=>$request->mob_phone,
            "phone" => $request->phone,
            "email" => $request->email,
            "cnh" => $request->cnh
        ];
        $address = [
            "uf" => $request->uf,
            "number" => $request->number,
            "city" => $request->city,
            "additional" => $request->additional,
            "street" => $request->street,
            "zipcode" => $request->zipcode,
        ];
        parent::withAndChange([
            \App\Models\Driver::class => $drivers,
            \App\Models\Address::class => $address,
        ],
        ["permiss" => true, "key" => "driver_id"]);

        return parent::update($request, $id);
    }   

    public function store(Req $request){
        $drivers = [
            "cpf_cnpj" => $request->cpf_cnpj,
            "fullname" => $request->fullname,
            "birthdate"=> $request->birthdate,
            "mob_phone"=>$request->mob_phone,
            "phone" => $request->phone,
            "email" => $request->email,
            "cnh" => $request->cnh
        ];
        $address = [
            "uf" => $request->uf,
            "number" => $request->number,
            "city" => $request->city,
            "additional" => $request->additional,
            "street" => $request->street,
            "zipcode" => $request->zipcode,
        ];
        $users = [
            "name" => $request->fullname,
            "email" => $request->email,
            "password" => Hash::make($request->cpf_cnpj),
        ];
        parent::withAndChange([
            \App\Models\Driver::class => $drivers,
            \App\Models\Addresses::class => $address,
            \App\User::class => $users
        ],
        ["permiss" => true, "key" => "driver_id"]);
        return parent::store($request);
    }
}
