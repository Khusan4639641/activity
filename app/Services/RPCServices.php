<?php
namespace App\Services;

use  App\Services\Interfaces\RpcContract;
use Illuminate\Support\Facades\DB;
use App\historyUsers;
use App\historyPosts;
class RPCServices implements RpcContract{

    public function income($array)
    {
        // TODO: Implement get() method.
            $user_id = "";
            $data = $this->RpcToArraay($array);
            if($this->security($data)) {
                $user = new historyUsers();
                $exist = $user->where('active_date', '=', $data['data']['active_user_date']);
                if (!$exist->exists()) {
                    $active_count = $user->where('user_id', '=', $data['data']['user_id'])->max('active_count');
                    $user->active_date = $data['data']['active_user_date'];
                    $user->active_count = $active_count + 1;
                    $user->user_id = $data['data']['user_id'];
                    $user->save();
                    $user_id = $user->id;
                } else {
                    $user_id = $exist->first()->id;
                }
                $post = new historyPosts();
                $post->history_users_id = $user_id;
                $post->post_url = $data['data']['url'];
                $post->save();

            }
    }
    public function getInfo($array)
    {

        // TODO: Implement send() method.

        $data = $this->RpcToArraay($array);

        $row = $data['data']['row'];
        if($row==0){
            $row=2;
        }
        if($this->security($data)) {
            $id=[];
            $historyUser = historyUsers::where('user_id',$data['data']['user_id'])->get();
            foreach ($historyUser as $value){
                array_push($id,$value->id);
            }
            $posts = historyPosts::whereIn('history_users_id',$id)->groupBy('post_url')
                ->selectRaw('count(*) as total, post_url, MAX(created_at) as date')
                ->paginate($row,['*'],'page',$data['data']['active_count']);
            echo collect($posts);

        }
    }
    protected function infoEncode($data){
        $code = [];
        foreach ($data as $key=>$val) {
            $indexKey = "";
            $indexValue = "";
            $values = str_split($val);
            $keys = str_split($key);
            foreach ($keys as $key) {
                $indexKey.=ord($key)+123;
            }
//          value code
            foreach ($values as $value) {
                $indexValue.=ord($value)+123;
            }
            $code[$indexKey] = $indexValue;
        }
        return $code;
    }
    protected function infoDecode($data){
        $decode = [];
        foreach ($data as $key=>$val) {
            $indexKey = "";
            $indexValue = "";
            $values = str_split($val,3);
            $keys = str_split($key,3);
            foreach ($keys as $key) {
                $indexKey.=chr($key-123);
            }
//          value code
            foreach ($values as $value) {
                $indexValue.=chr($value-123);
            }
            $decode[$indexKey] = $indexValue;
        }
        return $decode;
    }
    protected function RpcToArraay($data){
        $incomeData = [];
        $incomeHeader = [];

        $posts = explode("\n",$data);
        foreach ($posts as $post){
            if(json_decode($post)){
                $incomeData = json_decode($post);
            }else{
                $arrays = explode(":",$post);
                if(count($arrays)>=2){
                    $incomeHeader[$arrays[0]] = trim($arrays[1]);
                }
            }
        }
        return ['data'=>$this->infoDecode($incomeData->info),'header'=>$incomeHeader];
    }
    protected function security($data){
        $code = $this->infoEncode($data['data']);
        $message = json_encode(['info'=>$code]);
        $sign = hash_hmac('sha512', $message, env('API_SECRET_ACTIVE'));

        if($data['header']['Api-Key']!=env('API_KEY_ACTIVE')) return false;
        if($data['header']['Sign']!=$sign) return false;
        return true;
    }
}
