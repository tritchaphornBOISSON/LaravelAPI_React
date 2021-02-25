<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavorisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favoris', function (Blueprint $table) {
            $table->increments('idFavori'); //normalement idFavoris
            $table->integer('idUtilisateur');
            $table->string('idRestaurant');
            $table->string('nomRestaurant');
            $table->string('phoneRestaurant');
            $table->string('prixRestaurant');
            $table->string('imageRestaurant');
            $table->integer('ratingRestaurant');
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
        Schema::dropIfExists('favoris');
    }
}
