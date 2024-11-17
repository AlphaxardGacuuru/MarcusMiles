<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class WageSheetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $wageSheetServiceProviders = WageSheetServiceProviderResource::collection($this->wageSheetServiceProviders);

        return [
            "id" => $this->id,
            "code" => $this->code,
            "projectId" => $this->project->id,
            "projectCode" => $this->project->code,
            "projectName" => $this->project->name,
            "clientName" => $this->project->client->name,
            "wageSheetServiceProviders" => $wageSheetServiceProviders,
            "totalLabourForce" => $this->wageSheetServiceProviders->count(),
            "startsAt" => $this->starts_at,
            "endsAt" => $this->ends_at,
            "startsAtRaw" => Carbon::parse($this->starts_at)->format("Y-m-d"),
            "endsAtRaw" => Carbon::parse($this->ends_at)->format("Y-m-d"),
            "paidById" => $this->paidBy->id,
            "paidByName" => $this->paidBy->name,
            "approvedById" => $this->approvedBy->id,
            "approvedByName" => $this->approvedBy->name,
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
