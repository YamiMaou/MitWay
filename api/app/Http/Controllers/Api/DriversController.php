<?php

namespace App\Http\Controllers\Api;

use App\Extensions\ControllersExtends;
use App\Models\Driver;
use Illuminate\Http\Request as Req;
use Illuminate\Support\Facades\Hash;

class DriversController extends ControllersExtends
{
    public function __construct()
    {
        parent::__construct(Driver::class, 'home');
    }

    public function show(Req $request, $id, $with=[])
    {
       return  parent::show($request, $id, ['user', 'addresses', 'files_cnh', 'files_crlv']) ?? [];
    }

    public function update(Req $request, $id)
    {
        $validate = $request;
        
        $files = new \App\Http\Controllers\FilesController();
        $files = $files->multUpload($request, 'driver');
        $data = $files->request;
        try {
            $drivers = [
                "cpf_cnpj" => $request->cpf_cnpj,
                "fullname" => $request->fullname,
                "birthdate"=> $request->birthdate,
                "mob_phone"=>$request->mob_phone,
                "phone" => $request->phone,
                "email" => $request->email,
                "cnh" => $request->cnh,
            ];
            if(isset($request->file_cnh)){
                $drivers["file_cnh"] = $data["file_cnh"];
            }
            if(isset($request->file_cnh)){
                $drivers["file_crlv"] = $data["file_crlv"];
            }

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
                \App\Models\Addresses::class => $address],
            ["permiss" => true, "key" => "driver_id"]);

            return parent::update($validate, $id);
        } catch (\Exception $error) {
            return response()->json(["success"=> false, "type" => "error", "message" => "Problema ao Atualizar. ", "error" => $error->getTraceAsString()], 201);
        }
    }   

    public function store(Req $request){
        $validate = $request;
        $files = new \App\Http\Controllers\FilesController();
        $files = $files->multUpload($request, 'drivers');
        $data = $files->request;
       
        try {
           
            $users = [
                "name" => $request->fullname,
                "email" => $request->email,
                "password" => Hash::make($request->cpf_cnpj),
            ];
            $user = \App\User::create($users);

            $drivers = [
                "cpf_cnpj" => $request->cpf_cnpj,
                "fullname" => $request->fullname,
                "birthdate"=> $request->birthdate,
                "mob_phone"=>$request->mob_phone,
                "phone" => $request->phone,
                "email" => $request->email,
                "cnh" => $request->cnh,
                "file_cnh" => $data["file_cnh"],
                "file_crlv" => $data["file_crlv"],
                'user_id' => $user->id
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
                \App\Models\Addresses::class => $address
            ],
            ["permiss" => true, "key" => "driver_id"]);
            return parent::store($validate);
        } catch (\Exception $error) {
            return response()->json(["success"=> false, "type" => "error", "message" => "Problema ao Cadastrar. ", "error" => $error->getMessage()], 201);
        }
    }
}
