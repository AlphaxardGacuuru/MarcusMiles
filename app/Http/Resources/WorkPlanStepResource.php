<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkPlanStepResource extends JsonResource
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
			"workPlanId" => $this->work_plan_id,
			"projectId" => $this->workPlan->project_id,
            "name" => $this->name,
            "startsAt" => $this->starts_at,
            "endsAt" => $this->ends_at,
            "startsAtRaw" => Carbon::parse($this->starts_at)->format("Y-m-d"),
            "endsAtRaw" => Carbon::parse($this->ends_at)->format("Y-m-d"),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}