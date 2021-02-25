<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UtilisateursController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    $request->validate([
        'nom'=> 'required',
        'prenom'=> 'required',
        'telephone'=> 'required',
        'email'=> 'required',
        'password'=> 'required',
        'status'=>'required',
        'justificatif'=>'required'
    ]);
    $utilisateurs= new User([
        'nom'=> request('nom'),
        'prenom'=> request('prenom'),
        'telephone'=>request('telephone'),
        'email'=> request('email'),
        'password'=> Hash::make('mdp'),
        'status'=>request('status'),
        'justificatif'=>request('justificatif')
    ]);

    $utilisateurs->save();
    return $utilisateurs;
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
 {
 $request->validate([
 'nom' => 'required',
 'prenom' => 'required',
 'telephone' => 'required',
 'email' => 'required',
 'password' => 'required',
 'status'=>'required',
 'justificatif'=>'required'
 ]);
 $utilisateurs = User::find($id);
 
 $utilisateurs->nom = request('nom');
 $utilisateurs->prenom = request('prenom');
 $utilisateurs->telephone = request('telephone');
 $utilisateurs->email = request('email');
 $utilisateurs->password = Hash::make('password');
 $utilisateurs->status = request('status');
 $utilisateurs->justificatif = request('justificatif');
 $utilisateurs->save();
 
 return $utilisateurs;
 }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $utilisateurs = User::findOrFail($id);
        $utilisateurs->delete();

        return $utilisateurs;
    }



    
    
}
