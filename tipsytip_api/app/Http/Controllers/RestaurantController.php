<?php

namespace App\Http\Controllers;

use App\Models\Restaurants;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(){
        return Restaurants::all();
    }

    public function show($id)
    {
        return Restaurants::find($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomRestaurant' => 'required',
            'localisation' => 'required',
            'telephone' => 'required',
            'email' => 'required'
        ]);
        $restaurant= new Restaurants([
            'nomRestaurant' => request('nomRestaurant'),
            'localisation' => request('localisation'),
            'telephone' => request('telephone'),
            'email' => request('email')
        ]);
        $restaurant->save();
        return $restaurant;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nomRestaurant' => 'required',
            'localisation' => 'required',
            'telephone' => 'required',
            'email' => 'required'
        ]);
        $restaurant = Restaurants::find($id);
        
            $restaurant->nomRestaurant = request('nomRestaurant');
            $restaurant->localisation = request('localisation');
            $restaurant->telephone = request('telephone');
            $restaurant->email = request('email');
            $restaurant->save();
        
        return $restaurant;
    }

    public function destroy($id)
    {
        return Restaurants::destroy($id);
    }


}
