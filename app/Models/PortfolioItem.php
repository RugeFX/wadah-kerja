<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioItem extends Model
{
    use HasFactory;

    /**
     * Get the worker profile that owns the portfolio item.
     */
    public function workerProfile()
    {
        return $this->belongsTo(WorkerProfile::class);
    }
}
