<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PracticalCompletionCertificateResource extends JsonResource
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
            "employer" => $this->employer,
            "contractor" => $this->contractor,
            "projectManager" => $this->project_manager,
            "brief" => $this->brief,
            "contractDates" => $this->contract_dates,
            "contractDatesRaw" => Carbon::parse($this->contract_dates)->format("Y-m-d"),
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
		];
    }
}
