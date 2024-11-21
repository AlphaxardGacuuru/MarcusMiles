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
        Schema::create('site_visit_reports', function (Blueprint $table) {
            $table->id();
            $table->string("code");
            $table->foreignId("project_id")
                ->constrained()
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('approved_by');
            $table->timestamps();
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('approved_by')
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
        Schema::dropIfExists('site_visit_reports');
    }
};
