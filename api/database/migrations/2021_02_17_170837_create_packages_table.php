<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();

            $table->decimal('height', 4, 2);
            $table->decimal('width', 4, 2);
            $table->decimal('depth', 4, 2);
            $table->decimal('cubage', 8, 2);
            $table->decimal('weight', 8, 2);
            $table->decimal('price', 8, 2);
            $table->boolean('negotiable')->default(false); // preço frete negociavel
            $table->boolean('fractionated')->default(false); // permitir carga fracionada
            $table->string('note');

            $table->unsignedBigInteger('typeload_id')->nullable();
            $table->unsignedBigInteger('itinerary_id')->nullable();

            $table->foreign('typeload_id')->references('id')->on('typeloads')->onDelete('cascade');
            $table->foreign('itinerary_id')->references('id')->on('itineraries_id')->onDelete('cascade');

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
        Schema::dropIfExists('packages');
    }
}
