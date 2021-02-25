<?php
 
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
 
class AuthController extends Controller
{
 
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'nom'=>'required',
            'prenom'=>'required',
            'telephone'=>'required',
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:6', 
            'status'=>'required',
            'justificatif'=>'required'
        ]);
 
        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
 
        $utilisateur = new User;
        $utilisateur->nom = $request->nom;
        $utilisateur->prenom = $request->prenom;
        $utilisateur->telephone = $request->telephone;
        $utilisateur->email = $request->email;
        $utilisateur->password = bcrypt($request->password);
        $utilisateur->status = $request->status;
        $utilisateur->justificatif = $request->justificatif;
        $utilisateur->save();


        return response()->json(['status' => 'success'], 200);
    }
 
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
 
        if ($token = $this->guard()->attempt($credentials)) {
            return response()->json([
                'status' => 'success',
                'Authorization'=> $token,
        ], 200)->header('Authorization', $token);
        }
 
        return response()->json(['error' => 'login_error'], 401);

    }
 
    public function logout()
    {
        $this->guard()->logout();
 
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
 
    public function user(Request $request)
    {

        return response()->json(auth()->user());
    }
 
    public function refresh()
    {
        if ($token = $this->guard()->refresh()) {
            return response()
                ->json(['status' => 'successs'], 200)
                ->header('Authorization', $token);
        }
 
        return response()->json(['error' => 'refresh_token_error'], 401);
    }
 
    private function guard()
    {
        return Auth::guard();
    }
}