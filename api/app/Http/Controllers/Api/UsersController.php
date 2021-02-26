<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Validator;

class UsersController extends Controller
{
    public $successStatus = 200;
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = \App\User::find(Auth::id());
            $success = [ 
                'success' => true,
                'token' => $user->createToken('Yamitec',['view-posts', 'view-profile'])->accessToken,
                'data' => [
                    'user' => $user,
                    'client' => $user->client,
                    'driver' => $user->driver
                ]
            ];
            return response()->json($success, $this->successStatus);
        } else {
            return response()->json(['success' => false, 'message' => 'Acesso não autorizado'], 201);
        }
    }
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = \App\User::create($input);
        $success = [ 
            'success' => true,
            'token' => $user->createToken('Yamitec')->accessToken,
            'data' => $user
        ];
        return response()->json(['success' => $success], $this->successStatus);
    }

    /**
     * reset Password
     */

    public function resetPassword(Request $request){
        $user = new \App\User();
        $users = [
            "name" => $request->fantasy_name,
            "email" => $request->email,
            "password" => Hash::make($request->cpf_cnpj),
        ];
        $getUser = $user->where('email',$request->email)->with(['driver','client'])->first();
        $type = $getUser->driver ?? $getUser->client ?? null;
        if($type == null) 
            return response()->json(["success" => false, "message" => "Informações inválidas"]);

        $cpf_cnpj = $type->cpf_cnpj ?? $type->cnpj_cpf ?? null; 

        if($cpf_cnpj == null || $cpf_cnpj !== $request->cpf_cnpj) 
            return response()->json(["success" => false, "message" => "Informações inválidas"]);

        return response()->json(["success" => true, "message" => "Um e-mail foi enviado com seus dados de alteração de senha"]);
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => true, 'data' =>  $user], $this->successStatus);
    }
}
