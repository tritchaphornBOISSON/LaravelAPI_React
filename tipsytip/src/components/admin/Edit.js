import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from "./api";
import AppContainer from './AppContainer';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const Edit = ()=>{
    const {id}=useParams();
    const history = useHistory();
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [telephone, setTelephone]=useState('');
    const [fname,setFname]=useState('');
    const [Lname,setLname]=useState('');
    const [mail,setMail]=useState('');
    const [phone,setPhone]=useState('');
    const [stat,setStat]=useState('');

    const submit =  (e) => {
        console.log(status)
        e.preventDefault();
        var data = JSON.stringify({"status":status});

    var config = {
        method: 'put',
        url: `http://localhost:8000/api/utilisateursAdmin/${id}`,
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    };

axios(config)
        .then(res => console.log(res))
        .then(()=>
        {
            history.push("/admin")
        })
        
    }
    useEffect(()=>{
        const xamp =(id)=>{
        api.getOneUser(id).then(res=>{
            console.log(res);
            const rez = res.data;
            setFname(rez.prenom)
            setLname(rez.nom)
            setMail(rez.email)
            setPhone(rez.telephone)
            setStat(rez.status)
        })
    };
    xamp(id)
    },[])
    return (
        <AppContainer title="Modifier un utilisateur">
        <div className="Edit__container">
        <form onSubmit={submit}>
        <div className="form-row">
                <div className="form-group col-5">
                    <label>Prénom</label>
               
                    <input  onChange={e=> setPrenom(e.target.value)} placeholder={fname} name="prenom" type="text" className='form-control' />
                </div>
                <div className="form-group col-5">
                    <label>Nom</label>
                
                    <input onChange={e=> setNom(e.target.value)} placeholder={Lname} name="nom" type="text" className='form-control'/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Email</label>
               
                    <input onChange={e=> setEmail(e.target.value)} placeholder={mail} name="email" type="text" className='form-control'/>
                </div>
                <div className="form-group col-5">
                    <label>Télephone</label>
                    
                    <input onChange={e=> setTelephone(e.target.value)} placeholder={phone} name="telephone" type="text" className='form-control'/>
                </div>                
                <div className="form-group col">
                    <label>Role</label>
                    <select className="form-control" name="status" id="status" required 
                    onChange={e => setStatus(e.target.value)}
                    >
                    <option value="">--Veuillez choisir votre status--</option>
                    <option value='Administrateur' >Administrateur</option>
                    <option  value='Utilisateur'>Utilisateur</option>
                    <option  value='Restaurateur' >Restaurateur</option>
    
                    </select>
                </div>
            </div>
            <div className="form-group">
                <button   type="submit" className="btn btn-primary">
                    ENREGISTRER
                </button>
                <Link to="/admin" type="submit" className="btn btn-link">
                    ANNULER
                </Link>
            </div>
 </form>
        
        </div>
        </AppContainer>
    );
};

export default Edit