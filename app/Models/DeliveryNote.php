<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryNote extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'updated_at' => 'datetime:d M Y',
        'created_at' => 'datetime:d M Y',
    ];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
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

    public function receivedBy()
    {
        return $this->belongsTo(User::class, "received_by");
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function deliveryNoteInventory()
    {
        return $this->hasMany(DeliveryNoteInventory::class);
    }

    public function inventories()
    {
        return $this->belongsToMany(Inventory::class, 'delivery_note_inventories', 'delivery_note_id', 'inventory_id');
    }
}
