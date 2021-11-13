<?php

namespace App;

use App\historyPosts;
use Illuminate\Database\Eloquent\Model;

class historyUsers extends Model
{
    protected $fillable = ['*'];
    public function posts(){
        return $this->hasMany(historyPosts::class,'history_users_id','id');
    }
}
