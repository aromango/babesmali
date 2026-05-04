<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(){
    Schema::create('animals', function (Blueprint $table) {
        $table->id();
        $table->string('izena');
        $table->string('espeziea');
        $table->string('arraza')->nullable();
        $table->integer('adina');
        $table->enum('egoera', ['eskuragarri', 'adoptatua'])->default('eskuragarri');
        $table->string('argazkia')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
