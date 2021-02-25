<?php

namespace App\Http\Controllers;

use App\Models\Favoris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavorisController extends Controller
{
    public function index(){
        return Favoris::all();
    }
    /*public function index($id){
 
        $favoris = DB::table('favoris')
        ->where('favoris.idRestaurant',$id)
        ->join('users', 'users.idUtilisateur', '=', 'favoris.idUtilisateur')
        ->get();
         return $favoris;
        }*/

        public function show($id){
 
            $favoris = DB::table('favoris')
            ->where('favoris.idUtilisateur',$id)
            ->join('users', 'users.idUtilisateur', '=', 'favoris.idUtilisateur')
            ->get();
             return $favoris;
            }

    public function store(Request $request)
    {
        $request->validate([
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required',
            'nomRestaurant' => 'required',
            'phoneRestaurant' => 'required',
            'prixRestaurant' => 'required',
            'imageRestaurant' => 'required',
            'ratingRestaurant' => 'required',
        ]);
        $favoris = new Favoris([
            'idUtilisateur' => request('idUtilisateur'),
            'idRestaurant' => request('idRestaurant'),
            'nomRestaurant' => request('nomRestaurant'),
            'phoneRestaurant' => request('phoneRestaurant'),
            'prixRestaurant' => request('prixRestaurant'),
            'imageRestaurant' => request('imageRestaurant'),
            'ratingRestaurant' => request('ratingRestaurant'),
        ]);
        $favoris->save();
        return $favoris;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required',
            'nomRestaurant' => 'required',
            'phoneRestaurant' => 'required',
            'prixRestaurant' => 'required',
            'imageRestaurant' => 'required',
            'ratingRestaurant' => 'required',
        ]);
        $favoris = Favoris::find($id);
        
            $favoris->idUtilisateur = request('idUtilisateur');
            $favoris->idRestaurant= request('idRestaurant');
            $favoris->nomRestaurant= request('nomRestaurant');
            $favoris->phoneRestaurant= request('phoneRestaurant');
            $favoris->prixRestaurant= request('prixRestaurant');
            $favoris->imageRestaurant= request('imageRestaurant');
            $favoris->ratingRestaurant= request('ratingRestaurant');
            $favoris->save();
        
        return $favoris;
    }

    public function destroy($id)
    {
        return Favoris::destroy($id);
    }
}
