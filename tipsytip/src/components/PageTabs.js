import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../src/assets/logo_tipsytip.png';
import styles from '../styles/pageTabs.css'
import FormLabel from '@material-ui/core/FormLabel';
import { IconButton } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

class PageTabs extends React.Component {

  
  state = { 
    currentPage: '/',
    users: [],
        nom: '',
        prenom:'',
        telephone:'',
        email:'',
        password:'',
        status:'',
        justificatif:'',
 
    city:'',
    isMobile: false,
    isAdmin: ''
  }

  isActiveTab(tabName) {
    return (tabName === this.state.currentPage) ? 'nav-link active' : 'nav-link';
  }
componentDidMount(){
  fetch('http://localhost:8000/api/auth/user-profile',{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
        })
        .then(res =>res.json())
        .then(res => this.setState({isAdmin: res.status}) )
}
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      this.setState({ 
        currentPage: '/'
       });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isMobile !== this.props.isMobile) {
      if (this.props.isMobile) {
        this.setState({
          currentPage: '/restaurants'
        })
      }
    }
  } 

  onTabClick(event, tabName) {
    this.setState({ currentPage: tabName })
  }

  Logout = async e => {
    await fetch('http://localhost:8000/api/auth/logout',{
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
        })
        .then(res =>localStorage.clear())
        window.location.assign("/restaurants")
  }


  render () {
    let token = localStorage.getItem('token');
    let buttons;
    let mon_compte;
    let admin;
    
    
    if (!this.props.isMobile ) {
      if(this.state.isAdmin == "Administrateur"){
              admin=(
                <li className='nav-item'>
            <Link className={this.isActiveTab('/admin')} to="/admin"
                    style={{ textDecoration: 'none' }}
                    >
                Admin
            </Link>
    
        </li>
              )  
      }
      if(token)
      {
        mon_compte=(
          <li className='nav-item'>
            <Link className={this.isActiveTab('/moncompte')} to="/moncompte"
                    style={{ textDecoration: 'none' }}
                    >
                Mon Compte
            </Link>
        </li>
        )
        buttons=(<li className='nav-item'>
        <Link className={this.isActiveTab('/logout')} to="/restaurants"
                onClick={() => this.Logout()}
                style={{ textDecoration: 'none' }}
                >
            Logout
        </Link>
    </li>
    
    )
    
   
      }
      else
      {

       buttons =(<li className='nav-item'>
       <Link className={this.isActiveTab('/login')} to="/login"
               onClick={event => this.onTabClick(event, '/login')}
               style={{ textDecoration: 'none' }}
               >
           Login
       </Link>
   </li> )
      }
      return (
        <ul className='nav page-tabs'>
          <h1 className="nav-title">
            <Link className={this.isActiveTab('/')} id="nav-title" to="/"
            onClick={event => this.onTabClick(event, '/')}
            style={{ textDecoration: 'none' }}
           
            >
            <img src={logo} style= {{width:'70px'}} alt="Logo Tipsytip" />
          </Link>    
          </h1>
          
          <div className="nav-item-wrapper">
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/')} to="/"
                          onClick={event => this.onTabClick(event, '/')}
                          style={{ textDecoration: 'none' }}
                          >
                      Map
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/restaurants')} to="/restaurants"
                          onClick={event => this.onTabClick(event, '/restaurants')}
                          style={{ textDecoration: 'none' }}
                          >
                      Restaurants
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/profil')} to="/profil"
                          onClick={event => this.onTabClick(event, '/profil')}
                          style={{ textDecoration: 'none' }}
                          >
                      Profil
                  </Link>
              </li>
             
            

              {mon_compte}
              {admin}
              {buttons}
              
             
          </div>
          
        </ul>
        
      )
    } else {
      return (
        
        <ul className='nav page-tabs'>
          <h1 className="nav-title">
            <Link className={this.isActiveTab('/')} id="nav-title" to="/"
            onClick={event => this.onTabClick(event, '/')}
            style={{ textDecoration: 'none' }}
            >
            <img src={logo} style= {{width:'70px'}} alt="Logo Tipsytip" />
          </Link>    
          </h1>
         
          <div className="nav-item-wrapper">
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/')} to="/"
                          onClick={event => this.onTabClick(event, '/')}
                          style={{ textDecoration: 'none' }}
                          >
                      Restaurants
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/profile')} to="/profil"
                          onClick={event => this.onTabClick(event, '/profil')}
                          style={{ textDecoration: 'none' }}
                          >
                      profil
                    
                  </Link>
              </li>
              
          </div>
        </ul>
      )
    }
    
  }

};

export default PageTabs;