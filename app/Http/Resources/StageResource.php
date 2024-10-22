<?php

namespace App\Http\Resources;

use App\Http\Resources\IssueResource;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Resources\Json\JsonResource;

class StageResource extends JsonResource
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
            "name" => $this->name,
            "position" => $this->position,
            "test" => $this->test,
            "issues" => IssueResource::collection($this->uniqueIssues ?? []),
            "projects" => ProjectResource::collection($this->uniqueProjects ?? []),
            "createdBy" => $this->createdBy->name,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
