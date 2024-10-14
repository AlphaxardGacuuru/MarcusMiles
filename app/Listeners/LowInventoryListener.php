<?php

namespace App\Listeners;

use App\Notifications\LowInventoryNotification;

class LowInventoryListener
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
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $event
            ->usersToNotify
            ->each(function ($user) use ($event) {
                $user->notify(new LowInventoryNotification($event->inventory));
            });
    }
}
