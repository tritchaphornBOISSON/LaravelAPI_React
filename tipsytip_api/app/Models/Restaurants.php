<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurants extends Model
{
   
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'idRestaurant';
    protected $fillable = [
        'nomRestaurant',
        'localisation',
        'telephone',
        'email',
        
    ];
}
