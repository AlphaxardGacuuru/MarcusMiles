<?php

namespace App\Http\Controllers;

use App\Http\Services\SupplierGoodService;
use App\Models\SupplierGood;
use Illuminate\Http\Request;

class SupplierGoodController extends Controller
{
    public function __construct(protected SupplierGoodService $service)
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
            "supplierId" => "required|string",
            "goodId" => "required|string",
            "price" => "required|string",
        ]);

        [$saved, $message, $supplierGood] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $supplierGood,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SupplierGood  $supplierGood
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
     * @param  \App\Models\SupplierGood  $supplierGood
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "supplierId" => "nullable|string",
            "goodId" => "nullable|string",
            "price" => "nullable|string",
        ]);

        [$saved, $message, $supplierGood] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $supplierGood,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SupplierGood  $supplierGood
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $supplierGood] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $supplierGood,
        ], 200);
    }
}
