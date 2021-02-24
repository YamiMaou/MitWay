<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackageStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('package_statuses', function (Blueprint $table) {
            $table->id();

            $table->string('flag', 50)->default('no horario'); // atrasado, no horaro

            $table->unsignedBigInteger('collect_id')->nullable();
            $table->unsignedBigInteger('delivery_id')->nullable();
            
            $table->foreign('collect_id')->references('id')->on('collects')->onDelete('cascade');
            $table->foreign('delivery_id')->references('id')->on('deliveries')->onDelete('cascade');

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
        Schema::dropIfExists('package_statuses');
    }
}
