<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    


    public function up(): void
    {
        Schema::table('reservation', function (Blueprint $table) {
            $table->string('customer')
                  ->after('room_id')    
                  ->cascadeOnDelete();           
        });
    }

    


    public function down(): void
    {
        
    }
};
