<?php

use App\Models\Skill;
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
        Schema::create('worker_skills', function (Blueprint $table) {
            $table->foreignIdFor(WorkerProfile::class, 'worker_profile_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(Skill::class, 'skill_id')->constrained()->onDelete('cascade');
            $table->primary(['worker_profile_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('worker_skills');
    }
};
