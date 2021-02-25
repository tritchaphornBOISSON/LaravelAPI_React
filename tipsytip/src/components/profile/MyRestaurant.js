import React from 'react'

import StarRatings from 'react-star-ratings';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom'

import '../../styles/myRestaurant.css'

class MyRestaurant extends React.Component {
    render() {
        return (
            <>
            <div className="wrapper-for-close-icon">
                <div className="my-restaurant-wrapper">
                    <div className="my-restaurant-image-wrapper">
                        <img src={this.props.image}></img>
                    </div>
                    <div className="my-restaurant-content-wrapper">
                        <div className="my-restaurant-title-wrapper">
                        <Link to={`restaurant/${this.props.restaurant.id}`} className="content-title-link">
                            <h1 className="content-title">{this.props.title}</h1>                     
                        </Link>
                        <CancelIcon fontSize="large" className="close-icon-my-restaurant" onClick={() => this.props.onRemoveRestaurant(this.props.restaurant)}></CancelIcon>
                        </div>
                        <StarRatings
                            className="ratings"
                            name="rating"
                            rating={this.props.rating}
                            starDimension="30px"
                            starSpacing="2px"
                            starRatedColor='#ee4760'
                            starEmptyColor='#d3d1d1'                        
                        >
                        </StarRatings>
                        <h1 className="my-restaurant-price-categories">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h1>
                        <h1 className="my-restaurant-location">{this.props.location.address1}, {this.props.location.city}, {this.props.location.state}</h1>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default MyRestaurant