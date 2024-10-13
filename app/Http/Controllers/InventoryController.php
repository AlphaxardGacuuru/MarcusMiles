<?php

namespace App\Http\Controllers;

use App\Events\LowInventoryEvent;
use App\Http\Services\InventoryService;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function __construct(protected InventoryService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->service->index($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "projectId" => "required|string",
            "goodId" => "required|string",
            "quantity" => "required|string",
            "supplierId" => "nullable|string",
        ]);

        [$saved, $message, $inventory] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $inventory,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "quantity" => "nullable|string",
            "supplierId" => "nullable|string",
        ]);

        [$saved, $message, $inventory] = $this->service->update($request, $id);

		// LowInventoryEvent::dispatchIf($inventory->quantity < 2, $inventory);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $inventory,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $inventory] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $inventory,
        ], 200);
    }
}
