import React from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'

import '../../styles/restaurantCard.css'

import { connect } from "react-redux";
import { saveRestaurant } from '../../actions/index'
import { removeRestaurant } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
      saveRestaurant: restaurant => dispatch(saveRestaurant(restaurant)),
      removeRestaurant: restaurant => dispatch(removeRestaurant(restaurant))
    };
}

class RestaurantCard extends React.Component {

    state = {
        iconClicked: false,
        restaurant: ''
    }
    
    componentDidMount() {
        this.setState({
            restaurant: this.props.restaurant
        })
    }

    checkIfRestaurantIsSaved = currentRestaurant => {
        if (this.props.savedRestaurants.filter(e => e.restaurant.id === currentRestaurant.id).length > 0) {
        } else {
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

    render() {
        return(
            <div className="restaurant-card">
                <div className="image-wrapper">
                    <Link to={`restaurant/${this.props.id}`} className="view-details-link">
                        <img src={this.props.image} className="restaurant-card__image"></img>
                    </Link>
                </div>
                <div className="card-content">
                    <div className="name-wrapper">
                    <Link to={`restaurant/${this.props.id}`} className="view-details-link">
                        <h1 className="name-wrapper__name">{this.props.name}</h1>
                    </Link>
                        {this.props.savedRestaurants.filter(e => e.restaurant.id === this.props.restaurant.id).length > 0 
                        ? <FavoriteIcon className="restaurant-card-icon" onClick={() => this.onIconClick(this.props.restaurant)}></FavoriteIcon> 
                        : <FavoriteBorderIcon className="restaurant-card-icon" onClick={() => this.onIconClick(this.props.restaurant)}></FavoriteBorderIcon> 
                        }
                    </div>
                    <div className="ratings-wrapper">
                        <StarRatings
                            className="ratings"
                            name="rating"
                            rating={this.props.rating}
                            starDimension="25px"
                            starSpacing="2px"
                            starRatedColor='#ee4760'
                            starEmptyColor='#d3d1d1'                        
                        >
                        </StarRatings>
                        <h3 className="review-count">({this.props.reviewCount})</h3>
                    </div>
                    <h3 className="restaurant-price-categories">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h3>
                    <h3 className="restaurant-location">{this.props.location.address1}, {this.props.location.city}, {this.props.location.state}</h3>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RestaurantCard)
