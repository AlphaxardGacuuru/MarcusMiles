<?php

namespace App\Http\Services;

use App\Http\Resources\GoodResource;
use App\Models\Good;
use Carbon\Carbon;

class GoodService extends Service
{
    /*
     * Get All Goods
     */
    public function index($request)
    {
        $goodsQuery = new Good;

        $goodsQuery = $this->search($goodsQuery, $request);

        $goods = $goodsQuery
            ->orderBy("id", "asc")
            ->paginate(20);

        return GoodResource::collection($goods);
    }

    /*
     * Get One Good
     */
    public function show($id)
    {
        $good = Good::findOrFail($id);

        return new GoodResource($good);
    }

    /*
     * Store Good
     */
    public function store($request)
    {
        $good = new Good;
        $good->item_no = "G" . rand(0, 10);
        $good->name = $request->name;
        $good->created_by = $this->id;
        $saved = $good->save();

        $message = $good->name . " created successfully";

        return [$saved, $message, $good];
    }

    /*
     * Update Good
     */
    public function update($request, $id)
    {
        $good = Good::find($id);

        if ($request->filled("name")) {
            $good->name = $request->name;
        }

        if ($request->filled("itemNo")) {
            $good->item_no = $request->itemNo;
        }

        $saved = $good->save();

        $message = $good->name . " updated successfully";

        return [$saved, $message, $good];
    }

    /*
     * Delete Good
     */
    public function destroy($id)
    {
        $good = Good::findOrFail($id);

        $deleted = $good->delete();

        $message = $good->name . " deleted successfully";

        return [$deleted, $message, $good];
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

        return $query;
    }
}
