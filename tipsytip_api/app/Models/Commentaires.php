<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaires extends Model
{
   
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'idCommentaire';
    protected $fillable = [
        'idRestaurant',
        'idUtilisateur',
        'contenu',
        'nomRestaurant',
        'imageRestaurant'
        
    ];

}
