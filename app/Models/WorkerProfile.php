<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkerProfile extends Model
{
    use HasFactory;

    protected $casts = [
        'average_rating' => 'float',
    ];

    /**
     * Get the user that owns the worker profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the portfolio items for the worker profile.
     */
    public function portfolioItems()
    {
        return $this->hasMany(PortfolioItem::class);
    }

    /**
     * The skills that belong to the worker.
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'worker_skills');
    }

    /**
     * Get the proposals for the worker.
     */
    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    /**
     * Get all listing assignments for the worker.
     */
    public function listingAssignments()
    {
        return $this->hasMany(ListingAssignment::class);
    }
}
