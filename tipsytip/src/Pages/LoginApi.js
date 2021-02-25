import React , {useState}  from 'react';
import {Redirect} from 'react-router-dom';
import './LoginApi.css';


const LoginApi = () => {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    

    const submit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                
            },
            body: JSON.stringify({
                email,
                password,  
            })
        })
        .then(res => res.json())
        //.then(res => console.log(res))
        .then(res => {
            if(res){
               return localStorage.setItem('token', res.Authorization)
            }
        })
        
        

       

        setRedirect(true);   
    }
    
    if(redirect){
        return <Redirect  to="/profil" />
    }

    return (
        <div>
            <main className="form-signin">
            <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <input type="email"  className="form-control" placeholder="Email" required  
                            onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password"  className="form-control" placeholder="Password" required 
                            onChange={e => setPassword(e.target.value)}
                    />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    
                </form>
            </main>

        </div>
    )
}


export default LoginApi

