<?php

namespace App\Http\Services;

use App\Http\Resources\SupplierResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SupplierService extends Service
{
    /*
     * Get All Suppliers
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $suppliers = User::select("id", "name")
                ->where("account_type", "supplier")
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $suppliers,
            ], 200);
        }

        $suppliersQuery = User::where("account_type", "supplier");

        $suppliersQuery = $this->search($suppliersQuery, $request);

        $suppliers = $suppliersQuery
            ->paginate(20);

        return SupplierResource::collection($suppliers);
    }

    /*
     * Get One Supplier
     */
    public function show($id)
    {
        $supplier = User::findOrFail($id);

        return new SupplierResource($supplier);
    }

    /*
     * Store Supplier
     */
    public function store($request)
    {
        $supplier = new User;
        $supplier->name = $request->name;
        $supplier->email = $request->email;
        $supplier->password = Hash::make($request->email);
        $supplier->phone = $request->phone;
        $supplier->location = $request->location;
        $supplier->account_type = "supplier";
        $saved = $supplier->save();

        $message = $supplier->name . " created successfully";

        return [$saved, $message, $supplier];
    }

    /*
     * Update Supplier
     */
    public function update($request, $id)
    {
        $supplier = User::find($id);

        if ($request->filled("name")) {
            $supplier->name = $request->name;
        }

        if ($request->filled("email")) {
            $supplier->email = $request->email;
        }

        if ($request->filled("phone")) {
            $supplier->phone = $request->phone;
        }

        if ($request->filled("location")) {
            $supplier->location = $request->location;
        }

        $saved = $supplier->save();

        $message = $supplier->name . " updated successfully";

        return [$saved, $message, $supplier];
    }

    /*
     * Delete Supplier
     */
    public function destroy($id)
    {
        $supplier = User::findOrFail($id);

        $deleted = $supplier->delete();

        $message = $supplier->name . " deleted successfully";

        return [$deleted, $message, $supplier];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->input("name") . "%")
                ->orWhere("email", "LIKE", "%" . $request->input("name") . "%");
        }

        return $query;
    }
}
