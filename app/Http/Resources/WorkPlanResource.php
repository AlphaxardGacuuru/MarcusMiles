<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkPlanResource extends JsonResource
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
			"projectId" => $this->project_id,
			"projectCode" => $this->project->code,
            "name" => $this->name,
            "deposit" => $this->deposit,
            "totalCost" => $this->total_cost,
            "startsAt" => $this->starts_at,
            "endsAt" => $this->ends_at,
            "startsAtRaw" => Carbon::parse($this->starts_at)->format("Y-m-d"),
            "endsAtRaw" => Carbon::parse($this->ends_at)->format("Y-m-d"),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
