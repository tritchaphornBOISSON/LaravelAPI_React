import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import axios from 'axios';
import 'axios-progress-bar/dist/nprogress.css'

import Map from './components/map/Map'
import Grid from './components/grid/Grid'
import RestaurantDetails from './components/restaurantDetails/RestaurantDetails'
import Profile from './components/profile/Profile'
import PageTabs from './components/PageTabs';
import Login from './components/profile/login'
import './styles/app.css'
import Home from './components/admin/Home'
import Add from './components/admin/Add'
import Edit from './components/admin/Edit'

import MonCompte from './components/profile/MonCompte'

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
      savedRestaurants: state.savedRestaurants,
      createdReviews: state.reviews
    };
  };

class App extends React.Component {
  state = {
    viewport: {
        latitude: 45.764043,
        longitude: 4.835659,
        zoom: 12,
        width: '100vw',
        height: '90vh',
    },
    token:'pk.eyJ1Ijoic2hlcmlmLWZmcyIsImEiOiJjazgyNGFoM3Mwd29qM2xsbml4eHIyNm9qIn0.k8-uELDQoHBgpiITyyc6pg',
    restaurants: [],
    loading: false,
    searchInput: 'Lyon',
    width: window.innerWidth,
    isMobile: false,
    savedRestaurants: [],
    users: [],
  }

  saveNewRestaurant = restaurant => {
    if (this.state.savedRestaurants.includes(restaurant) === false) {
      this.setState({
        savedRestaurants: [restaurant, ...this.state.savedRestaurants]
      })
    } else {
        let newState = this.state.savedRestaurants.filter(function(e) { return e !== restaurant })
          this.setState({
            savedRestaurants: newState
          })
    }
 }

  onSearchSubmit = (payLoad) => {
    if (payLoad.city === '') {
      alert("entrer le nom d'une ville")
    }
    this.setState({
      searchInput: payLoad.city,
      loading: true
    })
    
    this.setState({
        searchInput: payLoad.term,
        loading: true
    })

    let offset=0
    for (let i=0; i<2; i++) {
      this.callYelpApi(offset, payLoad)
      offset+=100
    }
  }

  restaurantList = []
  callYelpApi(offset, payLoad) {
    
    let city,term
    if (payLoad !== undefined) {
      city = payLoad.city
      term = payLoad.term
    } else {
      city = "Lyon"
      term = "restaurant"
    }
    axios.get(`${''}https://api.yelp.com/v3/businesses/search?location=${city}&term=${term}&locale=fr_FR&limit=50&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        requireHeader: ['origin', 'x-requested-with'],
        removeHeaders: ['cookie', 'cookie2']
      },
        params: {
        categories: 'food',
      }
      })
      .then((res) => {
      res.data.businesses.forEach(res => {
        this.restaurantList.push(res)
      })
      let newViewport = {
        latitude: res.data.region.center.latitude,
        longitude: res.data.region.center.longitude,
        zoom: 12,
        width: '100vw',
        height: '90vh',
      }
      this.setState({
        restaurants: this.restaurantList,
        loading: false,
        viewport: newViewport
      })
      })
      .catch((err) => {
      console.log (err)
    })
    this.restaurantList = []
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ 
      width: window.innerWidth,
      isMobile: window.innerWidth <= 600 ? true : false
    });
  };

  componentDidMount() {
    this.setState({
      loading: true,
      isMobile: window.innerWidth <= 600 ? true : false
    })
    let offset=0
    for (let i=0; i<7; i++) {
      this.callYelpApi(offset)
      offset+=50
    }
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (!isMobile ) {
      return (
        <div>
          <BrowserRouter >
            <PageTabs isMobile={isMobile}  />
            <div>
              <Route path="/" exact 
              render={(routeProps) => <Map {...routeProps} state={this.state} onSearchSubmit={this.onSearchSubmit} loading={this.state.loading} restaurants={this.state.restaurants} savedRestaurants={this.props.savedRestaurants} onSaveRestaurant={this.saveNewRestaurant}   />}
              />
              <Route path="/restaurants"
                render={(routeProps) => <Grid {...routeProps} state={this.state} loading={this.state.loading} restaurants={this.state.restaurants} searchInput={this.state.searchInput} onSearchSubmit={this.onSearchSubmit} savedRestaurants={this.props.savedRestaurants} onSaveRestaurant={this.saveNewRestaurant} />}
               />
               <Route path="/profil"
                render={(routeProps) => <Profile {...routeProps} savedRestaurants={this.props.savedRestaurants} reviews={this.props.createdReviews} />}
               />
              
              <Route path="/restaurant/:id" 
              render={(routeProps) => <RestaurantDetails {...routeProps} isMobile={this.state.isMobile} savedRestaurants={this.props.savedRestaurants} onSaveRestaurant={this.saveNewRestaurant} reviews={this.props.createdReviews} />}
              />
              <Route path="/Login"
                render={(routeProps) => <Login {...routeProps} />}
               />

              <Route exact path="/admin" component={Home}/>
                <Route exact path="/admin/add" component={Add}/>
                <Route exact path='/admin/edit/:id' component={Edit}/>
              
                <Route exact path='/moncompte' component={MonCompte}/>
            
            </div>
          </BrowserRouter>
        </div>
      )
    } else {
      return (
        <div>
          <BrowserRouter>
            <PageTabs isMobile={isMobile} />
            <div>
              <Route path="/" exact
                render={(routeProps) => <Grid {...routeProps} state={this.state} loading={this.state.loading} restaurants={this.state.restaurants} searchInput={this.state.searchInput} onSearchSubmit={this.onSearchSubmit} savedRestaurants={this.props.savedRestaurants} onSaveRestaurant={this.saveNewRestaurant} />}
               />
              <Route path="/profil"
                render={(routeProps) => <Profile {...routeProps} savedRestaurants={this.props.savedRestaurants} reviews={this.props.createdReviews} />}
               />
              <Route path="/restaurant/:id" 
              render={(routeProps) => <RestaurantDetails {...routeProps} isMobile={this.state.isMobile} savedRestaurants={this.props.savedRestaurants} onSaveRestaurant={this.saveNewRestaurant} reviews={this.props.createdReviews} />}
              />
              <Route path="/Login"
                render={(routeProps) => <Login {...routeProps} />}
               />
            </div>
          </BrowserRouter>
        </div>
      )
    }
    
  }
  
}

export default connect(mapStateToProps)(App);