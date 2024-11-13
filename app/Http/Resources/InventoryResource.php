<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
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
			"projectName" => $this->project->name,
			"goodCode" => $this->good->code,
			"goodName" => $this->good->name,
			"unit" => $this->unit,
			"quantity" => $this->quantity,
			"supplierId" => $this->supplier_id,
			"supplierName" => $this->supplier?->name,
			"inDeliveryNote" => $this->deliveryNoteInventory()->exists(),
			"createdById" => $this->createdBy->id,
			"createdByName" => $this->createdBy->name,
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
