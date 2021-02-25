import axios from 'axios'

const API="http://127.0.0.1:8000/api"
export default {
    getAllUsers:()=>
    axios.get(`${API}/utilisateurs`),
    getOneUser:(id)=>
    axios.get(`${API}/utilisateurs/${id}`),
    addUser:(user)=>
    axios.post(`${API}/utilisateurs/`,user),
    updateUser:(id,user)=>
    axios.put(`${API}/utilisateurs/${id}`,user),
    deleteUser:(id)=>
    axios.delete(`${API}/utilisateurs/${id}`),
    getComment:()=>
    axios.get(`${API}/commentaires`),
    deleteComment:(id)=>
    axios.delete(`${API}/commentaires/${id}`)
}