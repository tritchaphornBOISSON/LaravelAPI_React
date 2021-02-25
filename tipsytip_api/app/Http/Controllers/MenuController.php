<?php

namespace App\Http\Controllers;

use App\Models\Menus;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(){
        return Menus::all();
    }

    public function show($id)
    {
        return Menus::find($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomMenu' => 'required',
            'prix' => 'required',
            'description' => 'required',
            'typePlat' => 'required',
            'photo' => 'required',
            'idRestaurant' => 'required'
        ]);
        $menu = new Menus([
            'nomMenu' => request('nomMenu'),
            'prix' => request('prix'),
            'description' => request('description'),
            'typePlat' => request('typePlat'),
            'photo' => request('photo'),
            'idRestaurant' => request('idRestaurant')
        ]);
        $menu->save();
        return $menu;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nomMenu' => 'required',
            'prix' => 'required',
            'description' => 'required',
            'typePlat' => 'required',
            'photo' => 'required',
            'idRestaurant' => 'required'
        ]);
        $menu = Menus::find($id);
        
            $menu->nomMenu = request('nomMenu');
            $menu->prix= request('prix');
            $menu->description= request('description');
            $menu->typePlat = request('typePlat');
            $menu->photo = request('photo');
            $menu->idRestaurant = request('idRestaurant');
            $menu->save();
        
        return $menu;
    }

    public function destroy($id)
    {
        return Menus::destroy($id);
    }
}
