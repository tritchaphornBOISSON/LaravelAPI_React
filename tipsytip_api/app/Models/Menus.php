<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{
   
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'idMenus';
    protected $fillable = [
        'prix',
        'description',
        'typePlat',
        'photo',
        'idReservation',
    ];
}
