<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Check if user is logged in
        $userId = auth('sanctum')->user()
        ? auth('sanctum')->user()->id
        : 0;

        return [
            "id" => $this->id,
            "issueId" => $this->issue_id,
            "text" => $this->text,
            "userId" => $this->createdBy->id,
            "userAvatar" => $this->createdBy->avatar,
            "userName" => $this->createdBy->name,
            "likes" => $this->total_likes,
            "hasLiked" => $this->hasLiked($userId),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
