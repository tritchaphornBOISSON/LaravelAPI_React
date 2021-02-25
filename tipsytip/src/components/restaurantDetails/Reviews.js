import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ReviewForm from './ReviewForm'
import Review from './Review'
import SearchBar from 'material-ui-search-bar'

import '../../styles/reviews.css'

class Reviews extends React.Component {

    state = {
        searchInput: '',
        sortValue: '',
        userReviews: '',
    }
    componentDidMount() {
        this.setState({
            userReviews: this.props.reviews
        })
    }
    render() {

        let userReviews = this.props.reviews.map((rating, index) => {
            return (
                <Review
                    className="user-review"
                    date={rating.time_created ? rating.time_created : new Date()}
                    rating={rating.rating}
                    text={rating.text}
                    image={rating.user.image_url}
                    name={rating.user.name}
                    key={index}
                >
                </Review>
            )
        })
        

        return(
            <div className="reviews-wrapper">
                <h1 className="section-title">Commentaire</h1>
                
                <ReviewForm onAddReview={this.props.onAddReview} name={this.props.name} id={this.props.id} isMobile={this.props.isMobile}></ReviewForm>
                {userReviews}
            </div>             
        )
    }
}

export default Reviews
