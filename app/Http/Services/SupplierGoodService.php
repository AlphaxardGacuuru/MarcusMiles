<?php

namespace App\Http\Services;

use App\Http\Resources\SupplierGoodResource;
use App\Models\SupplierGood;
use App\Models\SupplierGoodPrice;
use Illuminate\Support\Facades\DB;

class SupplierGoodService extends Service
{
    /*
     * Get All Supplier Goods
     */
    public function index($request)
    {
        $supplierGoodsQuery = new SupplierGood;

        $supplierGoodsQuery = $this->search($supplierGoodsQuery, $request);

        $supplierGoods = $supplierGoodsQuery
            ->orderBy("id", "asc")
            ->paginate(20);

        return SupplierGoodResource::collection($supplierGoods);
    }

    /*
     * Get One Supplier Good
     */
    public function show($id)
    {
        $supplierGood = SupplierGood::findOrFail($id);

        return new SupplierGoodResource($supplierGood);
    }

    /*
     * Store Supplier Good
     */
    public function store($request)
    {
        $supplierGood = new SupplierGood;
        $supplierGood->supplier_id = $request->supplierId;
        $supplierGood->good_id = $request->goodId;
        $supplierGood->created_by = $this->id;

        $saved = DB::transaction(function () use ($supplierGood, $request) {
            $supplierGood->save();

            $supplierGoodPrice = new SupplierGoodPrice;
            $supplierGoodPrice->supplier_good_id = $supplierGood->id;
            $supplierGoodPrice->price = $request->price;
            $supplierGoodPrice->created_by = $this->id;
            return $supplierGoodPrice->save();
        });

        $message = $supplierGood->good->name . " created successfully";

        return [$saved, $message, $supplierGood];
    }

    /*
     * Update Supplier Good
     */
    public function update($request, $id)
    {
        $supplierGood = SupplierGood::find($id);

        if ($request->filled("price")) {
            $supplierGoodPrice = new SupplierGoodPrice;
            $supplierGoodPrice->supplier_good_id = $supplierGood->id;
            $supplierGoodPrice->price = $request->price;
            $supplierGoodPrice->created_by = $this->id;
            $supplierGoodPrice->save();
        }

        $saved = $supplierGood->save();

        $message = $supplierGood->name . " updated successfully";

        return [$saved, $message, $supplierGood];
    }

    /*
     * Delete Supplier Good
     */
    public function destroy($id)
    {
        $supplierGood = SupplierGood::findOrFail($id);

        $deleted = $supplierGood->delete();

        $message = $supplierGood->name . " deleted successfully";

        return [$deleted, $message, $supplierGood];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->name . "%")
                ->orWhere("item_no", "LIKE", "%" . $request->itemNo . "%");
        }

        if ($request->filled("supplierId")) {
            $query = $query->where("supplier_id", $request->supplierId);
        }

        return $query;
    }
}
