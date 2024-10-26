<?php

namespace App\Listeners;

use App\Events\IssueCommentLikedEvent;
use App\Notifications\IssueCommentLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class IssueCommentLikedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\IssueCommentLikedEvent  $event
     * @return void
     */
    public function handle(IssueCommentLikedEvent $event)
    {
        $event
            ->comment
            ->createdBy
            ->notify(new IssueCommentLikedNotification($event->comment, $event->user));
    }
}
