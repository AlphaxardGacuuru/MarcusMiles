<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequisitionResource extends JsonResource
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
            "projectId" => $this->project->id,
            "projectCode" => $this->project->code,
            "projectName" => $this->project->name,
            "clientName" => $this->project->client->name,
            "approvedById" => $this->approvedBy->id,
            "approvedByName" => $this->approvedBy->name,
            "checkedById" => $this->checkedBy->id,
            "checkedByName" => $this->checkedBy->name,
            "paidById" => $this->paidBy->id,
            "paidByName" => $this->paidBy->name,
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
		];
    }
}
