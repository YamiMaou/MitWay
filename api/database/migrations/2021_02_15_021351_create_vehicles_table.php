<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('type', 50);
            $table->decimal('total_weight', 8,2);
            $table->decimal('with', 4,2);
            $table->decimal('weight', 4,2);
            $table->decimal('length', 4,2);
            $table->string('truckbody', 50); // tipo de carroceria
            $table->boolean('especial_package')->default(false); // tipo de carroceria
            $table->string('car_number'); // numero de placa
            $table->string('car_year', 4); // tipo text?Acho que sim, input

            $table->unsignedBigInteger('driver_id')->nullable();
            $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade');

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
        Schema::dropIfExists('vehicles');
    }
}
