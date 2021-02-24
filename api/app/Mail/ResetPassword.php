<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\User;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $link;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user,string $link)
    {
        $this->user = $user;
        $this->link = $link;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject("Redefinição de Senha");
        $this->to($this->user->email);

        // rota de reset
        return $this->view('https://www.mitway.com/recovery', [
            "user" => $this->user,
            "link" => $this->link,
        ]);
    }
}
