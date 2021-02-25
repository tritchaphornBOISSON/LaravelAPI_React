import React , {useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import './LoginApi.css';

const MonCompte = () => {
    const [nom,setNom] = useState('');
    const [prenom,setPrenom] = useState('');
    const [telephone,setTelephone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [status,setStatus] = useState('');
    const [justificatif,setJustificatif] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [state, setState] = useState('')


    useEffect( () => {
        (
            async () =>{
                const response = await fetch('http://localhost:8000/api/auth/user-profile',{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res =>res.json())
            .then(res => setState(res.idUtilisateur))
            }

            )();
    });

    
    const submit =  async (e) => {
        e.preventDefault();
       const remember_token = localStorage.getItem('token')
        await fetch(`http://localhost:8000/api/utilisateurs/${state}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'apllication/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                nom,
                prenom,
                email,
                password,
                telephone,
                status,
                justificatif,
           
            })
        })
        .then(res =>res.json())
        .then(res => console.log(res))
        console.log(localStorage.getItem('token'))
        setRedirect(true);    
    }
    
    if(redirect){
        return <Redirect  to="/profil" />
    }

    return (
        <div>
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Mon Compte</h1>
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

export default MonCompte

