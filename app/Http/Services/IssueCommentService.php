<?php

namespace App\Http\Services;

use App\Http\Resources\IssueCommentResource;
use App\Models\Issue;
use App\Models\IssueComment;
use App\Models\IssueCommentStage;
use App\Models\Project;
use App\Models\Stage;
use Illuminate\Support\Facades\DB;

class IssueCommentService extends Service
{
    /*
     * Get All Issue Comments
     */
    public function index($request)
    {
        $issueCommentsQuery = new IssueComment;

        $issueCommentsQuery = $this->search($issueCommentsQuery, $request);

        $issueComments = $issueCommentsQuery
            ->get();

        return IssueCommentResource::collection($issueComments);
    }

    /*
     * Get One Issue Comment
     */
    public function show($id)
    {
        $issueComment = IssueComment::findOrFail($id);

        return new IssueCommentResource($issueComment);
    }

    /*
     * Store Issue Comment
     */
    public function store($request)
    {
        $issueComment = new IssueComment;
        $issueComment->text = $request->text;
        $issueComment->issue_id = $request->id;
        $issueComment->created_by = $this->id;

        $saved = DB::transaction(function () use ($issueComment) {
            $issueComment->save();

            $issue = Issue::find($issueComment->issue_id);
			$issue->increment("total_comments");
            return $issue->save();
        });

        $message = "Comment created successfully";

        return [$saved, $message, $issueComment];
    }

    /*
     * Update Issue Comment
     */
    public function update($request, $id)
    {
        $issueComment = IssueComment::find($id);

        if ($request->filled("text")) {
            $issueComment->text = $request->text;
        }

        $saved = $issueComment->save();

        $message = "Comment updated successfully";

        return [$saved, $message, $issueComment];
    }

    /*
     * Delete Issue Comment
     */
    public function destroy($id)
    {
        $issueComment = IssueComment::findOrFail($id);

        $deleted = $issueComment->delete();

        $message = "Comment deleted successfully";

        return [$deleted, $message, $issueComment];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("issueId")) {
            $query = $query
                ->where("issue_id", $request->issueId);
        }

        return $query;
    }
}
