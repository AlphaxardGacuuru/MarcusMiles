<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GoodResource extends JsonResource
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
			"id" => $this->id,
			"code" => $this->code,
			"name" => $this->name,
			"createdBy" => $this->createdBy->name,
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
