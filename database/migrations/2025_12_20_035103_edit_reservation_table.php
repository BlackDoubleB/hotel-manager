<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::table('reservation', function (Blueprint $table) {
            $table->foreignId('payment_id')
                  ->after('id')                  // opcional
                  ->constrained('payment')     // tabla a la que apunta
                  ->cascadeOnDelete();           // opcional
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
