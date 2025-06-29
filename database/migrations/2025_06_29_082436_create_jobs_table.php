<?php

use App\Models\BusinessProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(BusinessProfile::class)->constrained()->onDelete('cascade');

            $table->enum('job_type', ['PROJECT', 'TIME_BASED'])->default('PROJECT');

            $table->string('title');
            $table->text('description');

            $table->decimal('project_budget_min', 10, 2)->nullable();
            $table->decimal('project_budget_max', 10, 2)->nullable();

            $table->enum('rate_type', ['HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY'])->nullable();
            $table->decimal('rate_amount', 10, 2)->nullable();
            $table->dateTime('start_datetime')->nullable();
            $table->dateTime('end_datetime')->nullable();

            $table->enum('status', ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])->default('OPEN');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
