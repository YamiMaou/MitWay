<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();

            $table->string('cnh', 100);
            $table->string('fullname', 100);
            $table->string('cpf_cnpj', 14);
            $table->date('birthdate');
            $table->string('email', 100);
            $table->string('mob_phone', 11); // celular
            $table->string('phone', 11);

            //$table->unsignedBigInteger('package_id')->nullable();
            //$table->unsignedBigInteger('address_id')->nullable();
            $table->unsignedBigInteger('service_id')->nullable();

            //$table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            //$table->foreign('qualification_id')->references('id')->on('qualifications')->onDelete('cascade');

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
        Schema::dropIfExists('drivers');
    }
}
