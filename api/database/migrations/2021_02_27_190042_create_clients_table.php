<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            $table->string('cnpj_cpf', 14);
            $table->string('company_name', 100);
            $table->string('fantasy_name', 100);
            $table->string('email', 100);
            $table->string('mob_phone', 30);
            $table->string('phone', 30);

            $table->unsignedBigInteger('user_id');
           // $table->unsignedBigInteger('file_id')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
