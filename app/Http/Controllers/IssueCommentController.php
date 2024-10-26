<?php

namespace App\Http\Controllers;

use App\Http\Services\IssueCommentService;
use App\Models\IssueComment;
use Illuminate\Http\Request;

class IssueCommentController extends Controller
{
    public function __construct(protected IssueCommentService $service)
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
            "text" => "required|string|max:10000",
            "id" => "required|string",
        ]);

        [$saved, $message, $issueComment] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $issueComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueComment  $issueComment
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
     * @param  \App\Models\IssueComment  $issueComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "text" => "nullable|string|max:10000",
        ]);

        [$saved, $message, $issueComment] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $issueComment,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueComment  $issueComment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $issueComment] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $issueComment,
        ], 200);
    }
}
