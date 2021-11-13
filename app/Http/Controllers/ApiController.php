<?php

namespace App\Http\Controllers;

use App\Services\Interfaces\RpcContract;
use Illuminate\Http\Request;
use App\historyUsers;
use App\historyPosts;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function income(Request $request,RpcContract $rpcContract){
        $rpcContract->income($request);
    }
    public function test($id=null){
        return view('welcome');
    }
    public function getInfo(Request $request,RpcContract $rpcContract){
        $rpcContract->getInfo($request);
    }
}
