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
        return [
			"name" => $this->name,
			"type" => $this->type,
			"description" => $this->description,
			"createdBy" => $this->createdBy->name,
			"updatedAt" => $this->createdAt,
			"createdAt" => $this->createdAt,
		];
    }
}
