<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'partner_reff',
        'amount',
        'customer_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'signature',
        'expired',
        'url_callback',
    ];
}
