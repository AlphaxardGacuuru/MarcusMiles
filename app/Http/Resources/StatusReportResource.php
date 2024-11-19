<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class StatusReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $actionItems = collect($this->action_items)
            ->map(function ($actionItem) {
                $actionItem = collect($actionItem);
                $dueDateRaw = Carbon::parse($actionItem["dueDate"])->format("Y-m-d");
				$actionItem->put("dueDateRaw", $dueDateRaw);

                return $actionItem->all();
            });

        return [
            "id" => $this->id,
            "code" => $this->code,
            "projectId" => $this->project->id,
            "projectCode" => $this->project->code,
            "projectName" => $this->project->name,
            "clientName" => $this->project->client->name,
            "actionItems" => $actionItems,
            "approvedById" => $this->approvedBy->id,
            "approvedByName" => $this->approvedBy->name,
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
