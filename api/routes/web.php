<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Auth::routes();

Route::get( '/{path?}', function(){
    return view( 'react.index' );
} )->where('path', '.*');

Auth::routes();
/*
Route::resource('/', 'HomeController');

Route::resource('posts', 'PostsController');

Route::resource('developers', 'DevelopersController');*/

Route::get( '/recovery', function(){
    return view( 'password_recovery' );
} );

Route::get( '/teste', function(){
    return view( 'teste' )->name('teste');
} );

Route::post('recovery', "Api\AccountController@checkEmail");