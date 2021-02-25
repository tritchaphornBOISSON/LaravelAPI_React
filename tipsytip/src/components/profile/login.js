import React, {Component} from "react";
import '../../styles/login.css'
import {useHistory, Redirect} from 'react-router-dom';
import axios from "axios";






const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export class Login extends Component {
  
 
  constructor(props) {

    
    super(props);
    
    this.state = {
      redirect: false,
        showHideLogin: true,
        showHideRegister: false,
        nom: null,
        prenom: null,
        telephon: null,
        email: null,
        password: null,
        status: null,
        justificatif: null,
        formErrors: {
        nom: "",
        prenom: "",
        email: "",
        password: ""
      }
    };
    this.hideComponent = this.hideComponent.bind(this);
  };
    
  
 
  handleSubmitLogin = e => {
    
    
    e.preventDefault();

    fetch('http://localhost:8000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,  
            })
        })
        .then(res =>res.json() )
        .then(res => {
            if(res){
               const token =  localStorage.setItem('token', res.Authorization)
               fetch('http://localhost:8000/api/auth/user-profile',{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
        })
        .then(res =>res.json())
        .then(res => {
            const users = res
            this.setState({users})
            console.log(users.status)
            if(users.status === "Utilisateur"){
              window.location.assign("/profil")
            }else{
              window.location.assign("/admin")
            }
        })


            }
        })
        
        
        /*const config = {
          method: 'get',
          url: 'http://localhost:8000/api/auth/user-profile',
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }};
        axios(config)
        .then(function (response) {
        console.log(response.data.status);
        if(response.data.status === "Utilisateur"){
          console.log('coucou')
          window.location.assign("/profil")
        }else{
          window.location.assign("/admin")
        }
        })
        .catch(function (error) {
        console.log(error);
        });*/
        
        


      

  };
  

  handleSubmitRegister = e => {
    e.preventDefault();

    fetch('http://localhost:8000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                telephone: this.state.telephone,
                email: this.state.email,
                password: this.state.password,
                status: this.state.status,
                justificatif: this.state.justificatif
            })
        })
        .then(res =>res.json())
        .then(res => console.log(res))
        this.props.history.push("/")
        window.location.reload()
    }
 

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    
    switch (name) {
      case "nom":
        formErrors.nom =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "prenom":
        formErrors.prenom =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    };

    this.setState({ formErrors, [name]: value }, () => (this.state));
  }
  hideComponent(name){
      switch (name) {
          case "showHideLogin":
            this.setState({ showHideLogin: !this.state.showHideLogin });
            this.setState({ showHideRegister: !this.state.showHideRegister });
            break;
            

          case "showHideRegister":
            this.setState({ showHideRegister: !this.state.showHideRegister });
            this.setState({ showHideLogin: !this.state.showHideLogin });
            break; 
            default: 
            
      }
  
    };

  render() {

    /*if (this.state.redirect) {
      return <Redirect to="/login" />;
    }*/
    
    const { formErrors, showHideLogin, showHideRegister} = this.state;

    return (
        
      <div id="hidden_login" className="wrapper-login">
      {showHideLogin && (
        <div className="form-wrapper-login">
          <h1>Se connecter</h1>
          <form onSubmit={this.handleSubmitLogin} noValidate>
           
            <div className="email">
              <label htmlFor="email">E-mail</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="E-mail"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            
            <div className="password">
              <label htmlFor="password">Mot de passe</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="************"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            
            <div className="createAccount">
              <button type="submit">Se Loguer</button>
              <button onClick={() => this.hideComponent("showHideLogin")}>Vous n'avez pas de compte ?</button>
            </div>
          </form>
        </div>
        )}
        {showHideRegister && (
        <div id="hidden_register">
        <div className="wrapper-login">
        <div className="form-wrapper-login">
          <h1>Création du compte</h1>
          <form onSubmit={this.handleSubmitRegister} noValidate>
            <div className="nom">
              <label htmlFor="nom">Nom</label>
              <input
                className={formErrors.nom.length > 0 ? "error" : null}
                placeholder="Nom"
                type="text"
                name="nom"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.nom.length > 0 && (
                <span className="errorMessage">{formErrors.nom}</span>
              )}
            </div>
            <div className="prenom">
              <label htmlFor="prenom">Prénom</label>
              <input
                className={formErrors.prenom.length > 0 ? "error" : null}
                placeholder="Prénom"
                type="text"
                name="prenom"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.prenom.length > 0 && (
                <span className="errorMessage">{formErrors.prenom}</span>
              )}
            </div>
           
            <div className="telephone">
              <label htmlFor="telephone">Téléphone</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Téléphone"
                type="telephone"
                name="telephone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">E-mail</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="E-mail"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Mot de passe</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="************"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            {/*<div className="password_confirmation">
              <label htmlFor="password_confirmation">Confirmez votre mot de passe</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password confirmation"
                type="password_confirmation"
                name="password_confirmation"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
              </div>*/}
              <select className="form-control" name="status" id="status" required 
                    onChange={this.handleChange}
                    >
                    <option value="">--Veuillez choisir votre status--</option>
                    <option value='Administrateur' >Administrateur</option>
                    <option  value='Utilisateur'>Utilisateur</option>
                    <option  value='Restaurateur' >Restaurateur</option>
    
                    </select>
                    <div className="justificatif">
              <label htmlFor="justificatif">Justificatif</label>
              <input
                className=""
                placeholder="Justificatif"
                type="text"
                name="justificatif"
                noValidate
                onChange={this.handleChange}
              />
            </div>
              {/*<div className="checkbox">
              <label className="checkbox_box">
                <input type="checkbox" />
              </label>
              <label className="checkbox_texte" htmlFor="checkbox_texte">Revendiquez-vous un restaurant ?</label>
              
              <div className="file has-name is-right">
                <label className="file-label">
                  <input className="file-input" type="file" name="resume"/>
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                        </span>
                      </span>
                      <span className="file-name">
                    Kbis .pdf .jpg .png
                  </span>
                  <label className="checkbox_texte" htmlFor="checkbox_texte">Merci d'enoyer votre Kbis</label>
                </label>
              </div>
              </div>*/}
            <div className="createAccount">
              <button type="submit">Créer mon compte</button>
               <button onClick={() => this.hideComponent("showHideRegister")}>Vous avez un compte ?</button>
            </div>
          </form>
        </div>
      </div>
      </div>
      )}
      </div>

    );
  }
}

export default Login;