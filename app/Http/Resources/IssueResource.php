<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
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
            "title" => $this->title,
            "description" => $this->description,
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "assignedToId" => $this->assignedTo->id,
            "assignedToName" => $this->assignedTo->name,
            "plannedStartDate" => $this->planned_start_date,
            "plannedEndDate" => $this->planned_end_date,
            "priority" => $this->priority,
            "projectId" => $this->project_id,
            "totalComments" => $this->total_comments,
            "position" => $this->position,
            "new" => $this->new,
            "currentStageId" => $this->currentStage()->stage_id,
        ];
    }
}
