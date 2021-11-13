<?php
namespace App\Services\Interfaces;

interface RpcContract {
    public function income($array);
    public function getInfo($array);
}
