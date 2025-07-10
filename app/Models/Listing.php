<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Listing extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'deadline' => 'date',
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
        ];
    }

    /**
     * Get the business profile that owns the project.
     */
    public function businessProfile()
    {
        return $this->belongsTo(BusinessProfile::class);
    }

    /**
     * The skills required for the project.
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'listing_skills');
    }

    /**
     * Get the proposals for the project.
     */
    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    /**
     * Get the reviews for the project.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get all assignments for the job, including historical ones.
     */
    public function assignments()
    {
        return $this->hasMany(ListingAssignment::class);
    }

    /**
     * Get only the currently active assignment for the job.
     */
    public function activeAssignment()
    {
        return $this->hasOne(ListingAssignment::class)->where('status', 'ACTIVE');
    }
}
