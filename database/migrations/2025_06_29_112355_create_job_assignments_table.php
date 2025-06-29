<?php

use App\Models\Job;
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
        Schema::create('job_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Job::class)->constrained()->onDelete('cascade');
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
        Schema::dropIfExists('job_assignments');
    }
};
