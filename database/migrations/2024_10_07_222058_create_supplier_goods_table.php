<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supplier_goods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('good_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
			$table->unsignedBigInteger('supplier_id');
			$table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('supplier_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('supplier_goods');
    }
};
