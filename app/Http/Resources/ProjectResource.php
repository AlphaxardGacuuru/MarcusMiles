<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Split the string by spaces into an array of words and get initials
        $clientInitials = collect(explode(' ', $this->client->name))
            ->map(fn($word) => substr($word, 0, 1));

        return [
            "id" => $this->id,
            "code" => $this->code,
            "name" => $this->name,
            "type" => $this->type,
            "description" => $this->description,
            "location" => $this->location,
            "createdBy" => $this->createdBy->name,
            "clientInitials" => $clientInitials,
            "client" => $this->client->name,
            "workPlanCount" => $this->workPlans->count(),
            "inventoryCount" => $this->inventories->count(),
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
