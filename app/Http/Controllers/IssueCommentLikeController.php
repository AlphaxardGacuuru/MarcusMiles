<?php

namespace App\Http\Controllers;

use App\Events\IssueCommentLikedEvent;
use App\Http\Services\IssueCommentLikeService;
use App\Models\IssueComment;
use App\Models\IssueCommentLike;
use Illuminate\Http\Request;

class IssueCommentLikeController extends Controller
{
    public function __construct(protected IssueCommentLikeService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
			"issueCommentId" => "required|string"
		]);

        [$saved, $message, $issueCommentLike] = $this->service->store($request);

        IssueCommentLikedEvent::dispatchIf(
            $saved,
            $issueCommentLike->comment,
            $issueCommentLike->createdBy
        );

        return response([
            "message" => $message,
            "data" => $issueCommentLike,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueCommentLike  $issueCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(IssueCommentLike $issueCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IssueCommentLike  $issueCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueCommentLike $issueCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueCommentLike  $issueCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueCommentLike $issueCommentLike)
    {
        //
    }
}