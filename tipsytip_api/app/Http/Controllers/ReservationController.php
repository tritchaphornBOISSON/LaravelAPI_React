<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index(){
        return Reservations::all();
    }

    public function show($id){
 
        $reservations = DB::table('reservations')
        ->where('reservations.idUtilisateur',$id)
        ->join('users', 'users.idUtilisateur', '=', 'reservations.idUtilisateur')
        ->get();
         return $reservations;
        }
 
    public function store(Request $request)
    {
        $request->validate([
            'dateReservation' => 'required',
            'heureReservation' => 'required',
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required',
            'nomRestaurant'=>'required',
            
        ]);
        $reservation = new Reservations([
            'dateReservation' => request('dateReservation'),
            'heureReservation' => request('heureReservation'),
            'idUtilisateur' => request('idUtilisateur'),
            'idRestaurant' => request('idRestaurant'),
            'nomRestaurant'=>request('nomRestaurant')
        ]);
        $reservation->save();
        return $reservation;
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'dateReservation' => 'required',
            'heureReservation' => 'required',
            'idUtilisateur' => 'required',
            'idRestaurant' => 'required'
        ]);
        $reservation = Reservations::find($id);
        
            $reservation->dateReservation = request('dateReservation');
            $reservation->heureReservation = request('heureReservation');
            $reservation->idUtilisateur = request('idUtilisateur');
            $reservation->idRestaurant= request('idRestaurant');
            $reservation->save();
        
        return $reservation;
    }

    public function destroy($id)
    {
        return Reservations::destroy($id);
    }
}
