<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    use HasFactory;

    /**
     * The workers that have this skill.
     */
    public function workers()
    {
        return $this->belongsToMany(WorkerProfile::class, 'worker_skills');
    }

    /**
     * The listings that require this skill.
     */
    public function listings()
    {
        return $this->belongsToMany(Listing::class, 'listing_skills');
    }
}
