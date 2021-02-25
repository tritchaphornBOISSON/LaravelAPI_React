<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'idReservation';
    protected $fillable = [
        'dateReservation',
        'heureReservation',
        'idUtilisateur',
        'idRestaurant',
        'nomRestaurant'
        
    ];
}
