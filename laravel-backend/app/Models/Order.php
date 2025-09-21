<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'shopId',
        'shopName',
        'fullName',
        'email',
        'phone',
        'cart_json',
        'ht',
        'vat',
        'ttc',
    ];

    protected $casts = [
        'cart_json' => 'array',
        'ht' => 'decimal:2',
        'vat' => 'decimal:2',
        'ttc' => 'decimal:2',
    ];
}
