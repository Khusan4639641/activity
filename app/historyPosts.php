<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\historyUsers;
class historyPosts extends Model
{
    //
    protected $fillable = ['*'];
    public function user(){
        return $this->hasOne(historyUsers::class,'id','history_users_id');
    }
}
