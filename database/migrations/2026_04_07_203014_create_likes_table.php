<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->unsignedBigInteger('id_video');
            $table->unsignedBigInteger('id_user');
 
            $table->primary(['id_video', 'id_user']);
 
            $table->foreign('id_video')
                ->references('id')->on('videometraje')
                ->cascadeOnDelete();
 
            $table->foreign('id_user')
                ->references('id')->on('users')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('likes');
    }
}
