import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import AppContainer from './AppContainer';
import api from './api'
import CommentContainer from './CommentContainer';
import {API_BASE_URL, BEARER_TOKEN} from '../../Hooks/apiConfig'
import axios from 'axios'
const Home = ()=>{
    const [users, setUsers]= useState(null);
    const [comments,setComments]=useState(null);
    const [resto, setResto] = useState(null);
    const [final, setFinal] = useState(null);


    const fetchUsers = () => {
        api.getAllUsers().then(res=>{
            const rez=res.data;
            setUsers(rez)
            // console.log(rez);
        })
    }
    const fetchComm = () => {
        api.getComment().then(res=>{
            const rez=res.data;
            console.log(rez);
            setComments(rez);
        })
    }  

    useEffect(() => {
        fetchUsers();
        fetchComm();
        // yelapi(id);
    },[]);
    const status = (sta) => {
        switch(sta){
            case 1:
                return ("Utilisateur")
            case 2:
                return ("Administrateur")
            
            }
    }
    
    const renderusers = () => {
        if (!users){
            return (
                <tr>
                    <td colSpan="4">
                        Loading utilisateurs...
                    </td>
                </tr>
            );
        }
        return users.map((user)=>(
            <tr>
                <td>{user.idUtilisateur}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.telephone}</td>
                <td>{(user.status)}</td>
                <td>
                  <Link to = {`/admin/edit/${user.idUtilisateur}`} class="btn btn-warning">MODIFIER</Link>
                  <button 
                  onClick={()=>{
                      api.deleteUser(user.idUtilisateur)
                      .then(fetchUsers)
                      .catch(err=>{
                          alert('cannot delete')
                      })
                  }}
                  type="button" 
                  class="btn btn-danger"
                  > DELETE </button>
                  </td>
            </tr>
        ))
    } 
    const renderCom = ()=> 
    {
            if (!comments){
                return (
                    <tr>
                        <td colSpan="4">
                            Loading Commentaires...
                        </td>
                    </tr>
                );
            }
            return comments.map((comment)=>(
                <tr>
                    <td>{comment.idCommentaire}</td>
                    <td>{comment.prenom+'  '+comment.nom}</td>
                    <td>
                        <p>{comment.nomRestaurant}</p>
                        <img  className="card-img-top" src={comment.imageRestaurant} 
                        style={{
                            width: 220,
                            height: 180,
                        }}/></td>
                    <td>{comment.contenu}</td>
                    <td>{converter(comment.created_at)}</td>
                    
                    <td>
                      <button 
                      onClick={()=>{
                          api.deleteComment(comment.idCommentaire)
                          .then(fetchComm)
                          .catch(err=>{
                              alert('cannot delete')
                          })
                      }}
                      type="button" 
                      class="btn btn-danger"
                      > DELETE </button>
                      </td>
                </tr>
            ))
        }
        const yelapi = (idy) =>
        {
            axios.get(`https://api.yelp.com/v3/businesses/${idy}`, {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    Origin: 'localhost',
                    withCredentials: true,
                }
        }).then(res=>{
            console.log(res.data)
            setResto(res.data.name)}
            )
        return resto
    }
    const converter = (date) => {
        const js_date_str = 'Le '+date.substr(0,10)+' à '+date.substr(11,8);
        return js_date_str;
    }
    return (
          <AppContainer title='DASHBOARD'>
      <Link to="/admin/add" class="btn btn-primary">Ajouter Utilisateur</Link>
    <div class="table-responsive">
      <table class="table table-striped mt-1">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Email</th>
                  <th>Numéro</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              {renderusers()}
          </tbody>
        </table>
      </div>
      <CommentContainer title='Commentaires'>
      <div class="table-responsive">
      <table class="table table-striped mt-1">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Utilisateurs</th>
                  <th>Restaurant</th>
                  <th>Contenu</th>
                  <th>Créer le</th>
              </tr>
          </thead>
          <tbody>
            {renderCom()}
          </tbody>
        </table>
      </div>
      </CommentContainer>
      </AppContainer>
    );
};

export default Home