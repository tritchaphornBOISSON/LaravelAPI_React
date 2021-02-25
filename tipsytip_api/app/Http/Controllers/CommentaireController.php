<?php

namespace App\Http\Controllers;

use App\Models\Commentaires;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentaireController extends Controller


{

    public function indexAdmin(){
        $commentaires = DB::table('commentaires')
        ->join('users', 'users.idUtilisateur', '=', 'commentaires.idUtilisateur')
        ->get();
         return $commentaires;
        
    }

    public function index($id){
 
        $commentaires = DB::table('commentaires')
        ->where('commentaires.idRestaurant',$id)
        ->join('users', 'users.idUtilisateur', '=', 'commentaires.idUtilisateur')
        ->get();
         return $commentaires;
        }

        public function show($id){
 
            $commentaires = DB::table('commentaires')
            ->where('commentaires.idUtilisateur',$id)
            ->join('users', 'users.idUtilisateur', '=', 'commentaires.idUtilisateur')
            ->get();
             return $commentaires;
            }

            public function count($id){
 
                $commentaires = DB::table('commentaires')
                ->where('commentaires.idUtilisateur',$id)
                ->join('users', 'users.idUtilisateur', '=', 'commentaires.idUtilisateur')
                ->count();
                 return $commentaires;
                }
    public function store(Request $request)
    {
        $request->validate([
            'idRestaurant' => 'required',
            'idUtilisateur' => 'required',
            'contenu' => 'required',
            'nomRestaurant'=>'required',
            'imageRestaurant'=>'required',
        ]);
        $commentaire = new Commentaires([
            'idRestaurant' => request('idRestaurant'),
            'idUtilisateur' => request('idUtilisateur'),
            'contenu' => request('contenu'),
            'nomRestaurant' => request('nomRestaurant'),
            'imageRestaurant' => request('imageRestaurant'),
        ]);
        $commentaire->save();
        return $commentaire;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'idRestaurant' => 'required',
            'idUtilisateur' => 'required',
            'contenu' => 'required'
        ]);
        $commentaire = Commentaires::find($id);
        
            $commentaire->idRestaurant= request('idRestaurant');
            $commentaire->idUtilisateur = request('idUtilisateur');
            $commentaire->contenu = request('contenu');
            $commentaire->save();
        
        return $commentaire;
    }

    public function destroy($id)
    {
        return Commentaires::destroy($id);
    }
}
