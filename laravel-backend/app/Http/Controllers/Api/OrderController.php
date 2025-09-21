<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'shopId' => 'required|string',
            'shopName' => 'required|string',
            'fullName' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'cart' => 'required|array',
            'totals.ht' => 'required|numeric',
            'totals.vat' => 'required|numeric',
            'totals.ttc' => 'required|numeric',
        ]);

        $order = Order::create([
            'shopId' => $data['shopId'],
            'shopName' => $data['shopName'],
            'fullName' => $data['fullName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'cart_json' => json_encode($data['cart']),
            'ht' => $data['totals']['ht'],
            'vat' => $data['totals']['vat'],
            'ttc' => $data['totals']['ttc'],
        ]);

        return response()->json([
            'id' => $order->id,
            'createdAt' => $order->created_at,
        ], 201);
    }
}
