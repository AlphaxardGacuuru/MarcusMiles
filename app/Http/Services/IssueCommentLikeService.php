<?php

namespace App\Http\Services;

use App\Models\IssueComment;
use App\Models\IssueCommentLike;

class IssueCommentLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        $query = IssueCommentLike::where('issue_comment_id', $request->input('issueCommentId'))
            ->where('created_by', $this->id);

        $hasLiked = $query->exists();

        if ($hasLiked) {
            // Get Like
            $issueCommentLike = $query->first();
            // Delete Like
            $query->delete();
			// Decrement Issue total likes
			$issueCommentLike->comment->decrement("total_likes");
            // Set Message
            $message = "Like removed";
            $added = false;
        } else {
            $issueCommentLike = new IssueCommentLike;
            $issueCommentLike->issue_comment_id = $request->input('issueCommentId');
            $issueCommentLike->created_by = $this->id;
            $issueCommentLike->save();

			// Increment Issue total likes
			$issueCommentLike->comment->increment("total_likes");

            $message = "Comment liked";
            $added = true;
        }

        // Check if user is owner of issue comment
        $notCurrentUser = $issueCommentLike->comment->created_by != $this->id;
        // Dispatch if comment is saved successfully and user is not owner of issue comment
        $canDispatch = $notCurrentUser && $added;

        return [$canDispatch, $message, $issueCommentLike];
    }
}
