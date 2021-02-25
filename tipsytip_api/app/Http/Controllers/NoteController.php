<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(){
        return Notes::all();
    }

    public function show($id)
    {
        return Notes::find($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required',
            'note' => 'required'
        ]);
        $note = new Notes([
            'idUtilisateur' => request('idUtilisateur'),
            'idRestaurant' => request('idRestaurant'),
            'note' => request('note')
        ]);
        $note->save();
        return $note;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required',
            'note' => 'required'
        ]);
        $note = Notes::find($id);
        
            $note->idUtilisateur = request('idUtilisateur');
            $note->idRestaurant= request('idRestaurant');
            $note->note = request('note');
            $note->save();
        
        return $note;
    }

    public function destroy($id)
    {
        return Notes::destroy($id);
    }
}
