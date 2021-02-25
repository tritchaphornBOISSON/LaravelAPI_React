import React from 'react'

import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarRatings from 'react-star-ratings';

import '../../styles/map/restaurantModal.css'

import { connect } from "react-redux";
import { saveRestaurant } from '../../actions/index'
import { removeRestaurant } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
        saveRestaurant: restaurant => dispatch(saveRestaurant(restaurant)),
        removeRestaurant: restaurant => dispatch(removeRestaurant(restaurant))
    };
}

class RestaurantsModal extends React.Component {

    state = {
        iconClicked: false,
        restaurant: ''
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
    componentDidMount() {
        this.setState({
            restaurant: this.props.restaurant
        })
    }

    render() {
        return(
            <div className="apartment-modal-container">
                <div className="apartment-modal-banner">
                    <div className="address-wrapper">
                        <h3 className="apartment-modal-banner__title">{this.props.address1}</h3>
                        <h3 className="apartment-modal-banner__title">{this.props.address2}</h3>
                    </div>
                    {this.props.savedRestaurants.filter(e => e.restaurant.id === this.props.restaurant.id).length > 0
                    ? <FavoriteIcon className="favorite-icon" onClick={() => this.onIconClick(this.props.restaurant)}></FavoriteIcon>
                    : <FavoriteBorderIcon className="favorite-icon" onClick={() => this.onIconClick(this.props.restaurant)}></FavoriteBorderIcon>
                    }
                </div>
                <div className="apartment-modal-details">
                    <div className="left-side">
                        <img src={this.props.photo} className="apartment-modal-photo" alt="apartment-image"></img>
                    </div>
                    <div className="right-side">
                        <h2 className="right-side__name">{this.props.name}</h2>
                        <h2 className="right-side__price">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h2>
                        <StarRatings 
                            rating={this.props.rating}
                            starDimension="28px"
                            starSpacing="2px"
                            starRatedColor='#ee4760'
                            starEmptyColor='#d3d1d1'
                        ></StarRatings>
                        <Button className="view-details" variant="contained" color="primary">
                            <Link to={`restaurant/${this.props.id}`} className="view-details-link">
                            voir le détail
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RestaurantsModal)
