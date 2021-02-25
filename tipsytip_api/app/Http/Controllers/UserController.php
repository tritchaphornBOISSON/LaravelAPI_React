<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function show($id)
    {
        return User::find($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'telephone' => 'required',
            'email' => 'required',
            'password' => 'required',
            'status' => 'required',
            'justificatif' => 'required'
        ]);
        $utilisateur = new User([
            'nom' => request('nom'),
            'prenom' => request('prenom'),
            'telephone' => request('telephone'),
            'email' => request('email'),
            'password' => Hash::make('password'),
            'status' => request('status'),
            'justificatif' => request('justificatif')
        ]);
        $utilisateur->save();
        return $utilisateur;
    }
  
    public function update1(Request $request, $id)
    {
        User::find($id)->update(['status' => request('status')]);
    }
   

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'telephone' => 'required',
            'email' => 'required',
            'password' => 'required',
            'status' => 'required',
            'justificatif' => 'required',
           
        ]);
        $utilisateur = User::find($id);
        
            $utilisateur->nom = request('nom');
            $utilisateur->prenom = request('prenom');
            $utilisateur->telephone = request('telephone');
            $utilisateur->email = request('email');
            $utilisateur->password = Hash::make('password');
            $utilisateur->status = request('status');
            $utilisateur->justificatif = request('justificatif');
         
            $utilisateur->save();
        
        return $utilisateur;
    }

    public function destroy($id)
    {
        return User::destroy($id);
    }

    

    
}
