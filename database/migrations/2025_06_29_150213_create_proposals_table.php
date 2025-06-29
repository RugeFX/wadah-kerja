<?php

use App\Models\Job;
use App\Models\Listing;
use App\Models\WorkerProfile;
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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Listing::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(WorkerProfile::class)->constrained()->onDelete('cascade');
            $table->text('cover_letter')->nullable();
            $table->enum('status', ['SENT', 'VIEWED', 'ACCEPTED', 'REJECTED'])->default('SENT');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
