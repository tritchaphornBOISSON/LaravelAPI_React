import React, {Component} from "react";
import axios from "axios";
import './register.css'

export class Register extends Component {

  userData;
  constructor(props) {
    super(props);

    this.state = {
        signupData: {
        
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        password: "",

      
      },
      msg: ""
    };
 
  };

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("https://localhost:8000/api/auth/register", 
      {headers: {"Access-Control-Allow-Origin": "*"}},
      this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              firstName: "",
              lastName: '',
              telephone: "",
              email: "",
              password: "",

            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form >
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className=""
                placeholder="First Name"
                type="text"
                name="firstName"
                value={this.state.signupData.firstName}
              onChange={this.onChangehandler}
              />
           
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className=""
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={this.state.signupData.lastName}
                onChange={this.onChangehandler}
              />
              
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className=""
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.signupData.email}
              onChange={this.onChangehandler}
              />
              
            </div>
            <div className="telephone">
              <label htmlFor="telephone">Telephone</label>
              <input
                className=""
                placeholder="Telephone"
                type="telephone"
                name="telephone"
                value={this.state.signupData.telephone}
              onChange={this.onChangehandler}
              />
            
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className=""
                placeholder="************"
                type="password"
                name="password"
                value={this.state.signupData.password}
              onChange={this.onChangehandler}
              />
            
            </div>
            <div className="password_confirmation">
              <label htmlFor="password_confirmation">Password confirmation</label>
              <input
                className=""
                placeholder="Password confirmation"
                type="password"
                name="password_confirmation"
                
              onChange={this.onChangehandler}
              />
             
              </div>
              <div className="checkbox">
              <label class="checkbox_box">
                <input type="checkbox" />
              </label>
              <label className="checkbox_texte" htmlFor="checkbox_texte">Revendiquez-vous un restaurant ?</label>
              
              <div className="file has-name is-right">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume"/>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                        </span>
                      </span>
                      <span class="file-name">
                    Kbis .pdf .jpg .png
                  </span>
                  <label className="checkbox_texte" htmlFor="checkbox_texte">Merci d'enoyer votre Kbis</label>
                </label>
              </div>
              
              </div>
            <div className="createAccount">
              <button 
              type="submit"
              onClick={this.onSubmitHandler}
              >Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;