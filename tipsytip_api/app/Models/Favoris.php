<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favoris extends Model
{
    use HasFactory;

    protected $primaryKey = 'idFavori'; //normalement idFavoris
    protected $fillable = [
        'idUtilisateur',
        'idRestaurant',
        'nomRestaurant',
        'phoneRestaurant',
        'prixRestaurant',
        'imageRestaurant',
        'ratingRestaurant'
    ];
}
