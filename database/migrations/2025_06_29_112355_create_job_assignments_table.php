<?php

use App\Models\Listing;
use App\Models\WorkerProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listing_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Listing::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(WorkerProfile::class)->constrained()->onDelete('cascade');

            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamp('unassigned_at')->nullable();

            $table->enum('status', ['ACTIVE', 'REPLACED', 'COMPLETED', 'CANCELLED'])->default('ACTIVE');
            $table->text('reason_for_unassignment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listing_assignments');
    }
};
