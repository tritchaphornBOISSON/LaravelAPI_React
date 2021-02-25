import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from './api'
import axios from "axios";
import {useHistory} from 'react-router-dom';

const Add = ()=>{
    const history = useHistory();
    const [loading,setLoading]=useState(null)
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword]=useState('');
    const [telephone, setTelephone]=useState('');
    const [justificatif,setJustificatif]=useState('null')

    const submit = async (e) => {
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
        history.push("/user")
    }
    return (
        <AppContainer title="Créez un utilisateur">
        <div className="Add__container">
        <form onSubmit={submit}>
 <h1 className="h3 mb-3 fw-normal">Créez un utilisateur</h1>
 <input className="form-control mb-3" placeholder="Nom" required 
 onChange={e => setNom(e.target.value)}
 />
 <input className="form-control mb-3" placeholder="Prenom" required 
 onChange={e => setPrenom(e.target.value)}
 />
 <input className="form-control mb-3" placeholder="Telephone" required 
 onChange={e => setTelephone(e.target.value)}
 />
 
 <input type="email" className="form-control mb-3" placeholder="Email" required 
 onChange={e => setEmail(e.target.value)}
 />
 <input type="password" className="form-control mb-3" placeholder="Password" required 
 onChange={e => setPassword(e.target.value)}
 />
 <input className="form-control mb-3" placeholder="Status" required 
 onChange={e => setStatus(e.target.value)}
 />
 <input className="form-control mb-3" placeholder="Justificatif" required 
 onChange={e => setJustificatif(e.target.value)}
 />
 <Link to="/admin" className="w-100 btn btn-lg btn-danger" > ANNULER </Link>
 <button className="w-100 btn btn-lg btn-primary" type="submit">ENREGISTRER</button>
 </form>
        
        </div>
        </AppContainer>
    );
};

export default Add