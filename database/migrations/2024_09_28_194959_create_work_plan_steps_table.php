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
        Schema::create('work_plan_steps', function (Blueprint $table) {
            $table->id();
			$table->string("item_no")->nullable();
			$table->foreignId('work_plan_id')
			->constrained()
			->onUpdate('cascade')
			->onDelete('cascade');
			$table->string('name');
            $table->timestamp('starts_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('ends_at')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->unsignedBigInteger('created_by');
            $table->timestamps();

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
        Schema::dropIfExists('work_plan_steps');
    }
};
