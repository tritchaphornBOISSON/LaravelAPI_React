import React , {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './LoginApi.css';

const RegisterApi = () => {
    const [nom,setNom] = useState('');
    const [prenom,setPrenom] = useState('');
    const [telephone,setTelephone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [status,setStatus] = useState('');
    const [justificatif,setJustificatif] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit =  async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                nom,
                prenom,
                telephone,
                email,
                password,
                status,
                justificatif
            })
        })
        .then(res =>res.json())
        .then(res => console.log(res))

        setRedirect(true);    
    }
    
    if(redirect){
        return <Redirect  to="/loginapi" />
    }

    return (
        <div>
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                    <input className="form-control" placeholder="Nom" required  
                            onChange={e => setNom(e.target.value)}
                    />
                    <input className="form-control" placeholder="Prenom" required  
                            onChange={e => setPrenom(e.target.value)}
                    />
                    <input className="form-control" placeholder="Telephone" required  
                            onChange={e => setTelephone(e.target.value)}
                    />
        
                    <input type="email"  className="form-control" placeholder="Email" required  
                            onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password"  className="form-control" placeholder="Password" required 
                            onChange={e => setPassword(e.target.value)}
                    />
                     <select className="form-control" name="status" id="status" required 
                    onChange={e => setStatus(e.target.value)}
                    >
                    <option value="">--Veuillez choisir votre status--</option>
                    <option value='Administrateur' >Administrateur</option>
                    <option  value='Utilisateur'>Utilisateur</option>
                    <option  value='Restaurateur' >Restaurateur</option>
    
                    </select>
                    <input   className="form-control" placeholder="Justificatif" required 
                            onChange={e => setJustificatif(e.target.value)}
                    />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>

        </div>
    )
}

export default RegisterApi

