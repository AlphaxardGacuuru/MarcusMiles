<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WageSheetServiceProviderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $totalDays = collect($this->days)
            ->reduce(function ($acc, $value) {
                if ($value) {
                    $acc++;
                }

                return $acc;
            }, 0);

        return [
            "id" => $this->id,
            "wageSheetId" => $this->wage_sheet_id,
            "projectServiceProviderId" => $this->project_service_provider_id,
            "projectServiceProviderName" => $this->projectServiceProvider->serviceProvider->name,
            "projectServiceProviderService" => $this->projectServiceProvider->service,
            "projectServiceProviderLabourRate" => $this->projectServiceProvider->labour_rate,
            "projectServiceProviderQuantityOfWork" => $this->projectServiceProvider->quantity_of_work,
            "days" => $this->days,
            "total" => $this->projectServiceProvider->labour_rate * $totalDays,
            "createdById" => $this->createdBy->id,
            "createdByName" => $this->createdBy->name,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
