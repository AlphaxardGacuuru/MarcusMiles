<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SupplierGoodPriceResource;

class SupplierGoodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
		$currentPrice = $this->supplierGoodPrices()
                ->orderBy("id", "desc")
                ->first()
                ->price;

        return [
            "id" => $this->id,
            "goodCode" => $this->good->code,
            "goodName" => $this->good->name,
            "goodId" => $this->good->id,
            "supplierId" => $this->supplier->id,
            "supplierName" => $this->supplier->name,
            "createdByName" => $this->createdBy->name,
            "currentPrice" => number_format($currentPrice),
            "prices" => SupplierGoodPriceResource::collection($this->supplierGoodPrices),
        ];
    }
}
