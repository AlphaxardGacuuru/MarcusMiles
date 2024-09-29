<?php

namespace App\Http\Services;

use App\Http\Resources\InventoryResource;
use App\Models\Inventory;

class InventoryService extends Service
{
    /*
     * Get All Inventories
     */
    public function index($request)
    {
        $inventoriesQuery = new Inventory;

        $inventoriesQuery = $this->search($inventoriesQuery, $request);

        $inventories = $inventoriesQuery
            ->paginate(20);

        return InventoryResource::collection($inventories);
    }

    /*
     * Get One Inventory
     */
    public function show($id)
    {
        $inventory = Inventory::findOrFail($id);

        return new InventoryResource($inventory);
    }

    /*
     * Store Inventory
     */
    public function store($request)
    {
        $inventory = new Inventory;
        $inventory->project_id = $request->projectId;
        $inventory->name = $request->name;
        $inventory->quantity = $request->quantity;
        $inventory->supplier_id = $request->supplierId;
        $inventory->created_by = $this->id;
        $saved = $inventory->save();

        $message = $inventory->name . " created successfully";

        return [$saved, $message, $inventory];
    }

    /*
     * Update Inventory
     */
    public function update($request, $id)
    {
        $inventory = Inventory::find($id);

        if ($request->filled("name")) {
            $inventory->name = $request->name;
        }

        if ($request->filled("quantity")) {
            $inventory->quantity = $request->quantity;
        }

        $inventory->supplier_id = $request->supplierId;

        $saved = $inventory->save();

        $message = $inventory->name . " updated successfully";

        return [$saved, $message, $inventory];
    }

    /*
     * Delete Inventory
     */
    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);

        $deleted = $inventory->delete();

        $message = $inventory->name . " deleted successfully";

        return [$deleted, $message, $inventory];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->name . "%");
        }

        if ($request->filled("projectId")) {
            $query = $query
                ->where("project_id", $request->projectId);
        }

        return $query;
    }
}
