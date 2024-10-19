<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectServiceProviderResource extends JsonResource
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
			"serviceProviderId" => $this->service_provider_id,
			"serviceProviderAvatar" => $this->serviceProvider->avatar,
			"serviceProviderName" => $this->serviceProvider->name,
			"serviceProviderPhone" => $this->serviceProvider->phone,
			"serviceProviderIdNumber" => $this->serviceProvider->id_number,
			"projectId" => $this->project_id,
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
