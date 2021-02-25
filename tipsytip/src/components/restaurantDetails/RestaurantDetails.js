import React from 'react'

import LoadingScreen from '../shared/LoadingScreen'
import SlideShow from './SlideShow'
import axios from 'axios';
import '../../styles/restaurantDetails.css'
import StarRatings from 'react-star-ratings';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Reviews from './Reviews'
import LocationAndHours from './LocationAndHours'

import { connect } from "react-redux";
import { saveRestaurant } from '../../actions/index'
import { removeRestaurant } from '../../actions/index'


function mapDispatchToProps(dispatch) {
    return {
      saveRestaurant: restaurant => dispatch(saveRestaurant(restaurant)),
      removeRestaurant: restaurant => dispatch(removeRestaurant(restaurant))
    };
}

class RestaurantDetails extends React.Component {

  state = {
            restaurant: {},
            reviews: [],
            userReviews: [],
            errorMessage: '',
            photos: [],
            sortValue: '',
            searchInput: '',
            iconClicked: false,
            favoris: [],
            users:[],
            idUtilisateur: '',
            idRestaurant: this.props.id,
            heureResvation:'',
            dateReservation:''
        }

    

    

    checkIfRestaurantIsSaved = currentRestaurant => {
        for (let i=0; i<this.props.savedRestaurants.length; i++) {
            if (this.props.savedRestaurants[i].id === currentRestaurant.id) {
                return true
            } else {
                return false
            }
        }
    }
    onIconClick = (restaurant) => {
        if (this.props.savedRestaurants.filter(e => e.restaurant.id === restaurant.id).length > 0) {
            this.props.removeRestaurant({ 
                restaurant: restaurant,
            });
            this.setState({
                iconClicked: false
            })
        } else {
            this.props.saveRestaurant({ 
                restaurant: restaurant,
            });
            this.setState({
                iconClicked: true
            })
        }
    }

    onSortValueChange = (sortValue) => {
        this.setState({
            sortValue: sortValue
        })
      }

    onSearchInputChange = (searchInput) => {
        this.setState({
            searchInput: searchInput
        })
    }

    getFilteredReviews() {
        let reviews = this.state.reviews

        let {sortValue, searchInput } = this.state;
        let sortedReviews;
    
        if (!!searchInput) {
          if (searchInput !== '') {
            sortedReviews = reviews.filter(review => review.text.toLowerCase().includes(searchInput.trim('').toLowerCase()));
            return sortedReviews            
          } else {
            sortedReviews = reviews
            return sortedReviews            
            }
          }
        
        if (!!sortValue) {
            if (sortValue === 'highest') {
                sortedReviews = reviews.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                return sortedReviews
            } 
            if (sortValue !== 'all' && sortValue === 'lowest') {
                sortedReviews = reviews.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                return sortedReviews
            } 
            else {
                sortedReviews = reviews;
                return sortedReviews
            }
        }

        return sortedReviews

    }

    componentDidMount() {
        this.callApi();

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
        console.log(users)
        })
    }
    onAddReview = (review) => {
        let userReviews = this.props.reviews.filter(e => e.name === this.state.restaurant.name)
        let { reviews } = this.state;
        let newReviews = [
            review,
            ...reviews
        ]
        this.setState({
            reviews: newReviews
        }) 
      }

    callApi() {
        axios.get(`${''}https://api.yelp.com/v3/businesses/${this.props.match.params.id}`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            requireHeader: ['origin', 'x-requested-with'],
            removeHeaders: ['cookie', 'cookie2']
            },
            })
            .then((res) => {
            this.setState({
                restaurant: res.data,
                photos: res.data.photos
            })
            })
            .catch((err) => {
            console.log ('error')
        })
        axios.get(`${''}https://api.yelp.com/v3/businesses/${this.props.match.params.id}/reviews?&locale=fr_FR`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            requireHeader: ['origin', 'x-requested-with'],
            removeHeaders: ['cookie', 'cookie2']
            },
            })
            .then((res) => {
            let userReviews = this.props.reviews.filter(e => e.id === this.props.match.params.id)
            this.setState({
                reviews: userReviews.concat(res.data.reviews),
            })
            })
            .catch((err) => {
            console.log ('error')
        })
    }
    
    handleAddToFavoris = async e => {
        //e.preventDefault();
        await fetch('http://localhost:8000/api/favoris',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    idUtilisateur: this.state.users.idUtilisateur,
                    idRestaurant: this.state.restaurant.id,
                    nomRestaurant: this.state.restaurant.name,
                    phoneRestaurant : this.state.restaurant.display_phone,
                    prixRestaurant: this.state.restaurant.price,
                    imageRestaurant: this.state.restaurant.image_url,
                    ratingRestaurant: this.state.restaurant.rating,
                })
            })
            .then(res =>res.json())
            .then(res => {
            const favoris = res
            this.setState({favoris})
            console.log(favoris)
            window.location.assign("/profil")
        })
        }


        handleChange =  event => {
     
            this.setState({ dateReservation: event.target.value});
            
          console.log(this.state.dateReservation)
        }

        
        handleChange1 =  event => {
     
            this.setState({ heureReservation: event.target.value});
            
          console.log(this.state.heureReservation)
        }

        
  handleAddToReservations = async e => {
    this.callApi();
    e.preventDefault();
    await fetch('http://localhost:8000/api/reservations',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                idUtilisateur: this.state.users.idUtilisateur,
                idRestaurant: this.state.restaurant.id,
                nomRestaurant: this.state.restaurant.name,
                dateReservation:this.state.dateReservation,
                heureReservation:this.state.heureReservation,
                

            })
        })
        .then(res =>res.json())
        .then(res => {
            alert("Reservation réussie")
        const reservations = res
        this.setState({reservations})
        console.log(reservations)
        console.log(this.state.dateReservation)
        window.location.assign("/profil")
    })
    }



    render() {        
        let sortedReviews = this.getFilteredReviews();
        return (
            this.state.restaurant == null ?
            <div>Pas de donnée pour ce restaurant</div>
            : (Object.keys(this.state.restaurant).length > 0
            ? 
                <React.Fragment className="wrapper">
                    <div className="header">
                        <div className="slideshow-wrapper">
                            <img photos={this.state.photos}></img>
                        </div>
                        <div className="header-information-wrapper">
                            <h1 className="restaurant-title">{this.state.restaurant.name}</h1>
                            <div className="rating-wrapper">
                                <StarRatings 
                                    className="ratings"
                                    rating={this.state.restaurant.rating}
                                    starDimension="32px"
                                    starSpacing="2px"
                                    starRatedColor='#ee4760'
                                    starEmptyColor='#d3d1d1'
                                ></StarRatings>
                                <h3 className="rating-count">({this.state.restaurant.review_count})</h3>
                            </div>
                            
                           <div className="restaurant-phone-wrapper">
                            <FavoriteBorderIcon className="phone-icon favorite-icon-restaurant-details" onClick={() => this.handleAddToFavoris(this.state.restaurant)}></FavoriteBorderIcon>
                            <h3 className="restaurant-phone restaurants-details-text save-text">Sauvegarder</h3>
                            </div>

                                {/*<div className="restaurant-phone-wrapper">
                                {this.props.savedRestaurants.filter(e => e.restaurant.id === this.state.restaurant.id).length > 0
                                ? <FavoriteIcon className="phone-icon favorite-icon-restaurant-details" onClick={() => this.onIconClick(this.state.restaurant)}></FavoriteIcon>
                                : <FavoriteBorderIcon className="phone-icon favorite-icon-restaurant-details" onClick={() => this.onIconClick(this.state.restaurant)}></FavoriteBorderIcon>
                                }
                                {this.props.savedRestaurants.filter(e => e.restaurant.id === this.state.restaurant.id).length > 0
                                ? <h3 className="restaurant-phone restaurants-details-text save-text">Retirer</h3>
                                : <h3 className="restaurant-phone restaurants-details-text save-text">Sauvegarder</h3>
                                }
                                
                            </div>*/}

                              
                            <div className="price-rating-tags">
                                <h3 className="restaurant-price">{this.state.restaurant.price}</h3>
                                <h3 className="restaurant-tags restaurants-details-text">{this.state.restaurant.categories[0].title}, {this.state.restaurant.categories[this.state.restaurant.categories.length - 1].title}</h3>
                            </div>
                            <div className="restaurant-phone-wrapper">
                                <PhoneRoundedIcon className="phone-icon"></PhoneRoundedIcon>
                                <h3 className="restaurant-phone restaurants-details-text">{this.state.restaurant.display_phone}</h3>
                            </div>
                            <div className="restaurant-address-wrapper">
                            <RoomRoundedIcon className="address-icon"></RoomRoundedIcon>
                            <h3 className="restaurant-address restaurants-details-text">{this.state.restaurant.location.display_address[0]}, {this.state.restaurant.location.display_address[1]}</h3>
                            </div>
                            {this.state.restaurant.hours ? 
                            (this.state.restaurant.hours.is_open_now 
                                ? 
                                <div className="restaurant-is-open">
                                    <EventAvailableIcon className="is-open-icon"></EventAvailableIcon>
                                    <h3 className="is-open-text restaurants-details-text">Ouvert <span className="is-open-emoji" role="img" aria-labelledby="yummy-emoji">😋</span></h3>
                                </div>
                                :
                                <div className="restaurant-is-open">
                                    <EventBusyIcon className="is-open-icon"></EventBusyIcon>
                                    <h3 className="is-open-text restaurants-details-text">Fermé <span className="is-open-emoji" role="img" aria-labelledby="sad-emoji">😔</span></h3>
                                </div>)
                                : ''
                            }
                        </div>
                    </div>
                    <div className="reviews-location-hours-wrapper">
                    <Reviews reviews={sortedReviews ? sortedReviews : this.state.reviews} onAddReview={this.onAddReview} onSortValueChange={this.onSortValueChange} onSearchInputChange={this.onSearchInputChange} name={this.state.restaurant.name} id={this.props.match.params.id} isMobile={this.props.isMobile}></Reviews>
           
                    
                    <LocationAndHours coordinates={this.state.restaurant.coordinates} hours={this.state.restaurant.hours} isMobile={this.props.isMobile} >

                        
                    </LocationAndHours>

                    <div className="reservations-wrapper">
 <main className="form-signin">
     
 <form  onSubmit={this.handleAddToReservations}>
 <h1 className="reservation-title ">Reservations</h1><br></br><br></br>
 {this.state.dateReservation}
 <input type="date" className="form-control" placeholder="date" required name="dateReservation"
onChange={this.handleChange}
 />
 {this.state.heureReservation}
 <input type="time" className="form-control" placeholder="heure" required  name="heureReservation"
onChange={this.handleChange1}
 />
 <button className="w-100 btn btn-lg btn-primary" type="submit" >Reserver</button>
 
 </form>
 </main>
 
 </div>
                    
                    </div>
                </React.Fragment>
            : <LoadingScreen></LoadingScreen>)
        )
        
    }
}

export default connect(null, mapDispatchToProps)(RestaurantDetails)
