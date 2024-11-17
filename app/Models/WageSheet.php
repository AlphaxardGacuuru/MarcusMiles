<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WageSheet extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'starts_at' => 'datetime:d M Y',
        'ends_at' => 'datetime:d M Y',
        'updated_at' => 'datetime:d M Y',
        'created_at' => 'datetime:d M Y',
    ];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function startsAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function endsAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    /*
     * Relationships
     */

    public function createdBy()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function paidBy()
    {
        return $this->belongsTo(User::class, "paid_by");
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, "approved_by");
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function wageSheetServiceProviders()
    {
        return $this->hasMany(WageSheetServiceProvider::class);
    }

    public function projectServiceProviders()
    {
        return $this->belongsToMany(ProjectServiceProvider::class, 'wage_sheet_service_providers', 'wage_sheet_id', 'project_service_provider_id');
    }
}
