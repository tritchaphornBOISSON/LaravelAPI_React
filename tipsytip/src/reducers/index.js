import { ADD_REVIEW } from "../constants/action-types";
import { REMOVE_REVIEW } from "../constants/action-types";
import { EDIT_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURANT } from "../constants/action-types";
import { REMOVE_RESTAURANT } from "../constants/action-types";

import userImage from '../../src/assets/user_large_square.png'


const initialState = {
    reviews: [],
    savedRestaurants: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_REVIEW) {
      return Object.assign({}, state, {
        reviews: state.reviews.concat(action.payload)
      });
    }

    if (action.type === REMOVE_REVIEW) {
      let index;
      state.reviews.forEach(review => {
        if (review === action.payload.review) {
          index = state.reviews.indexOf(review)
        }
      })
      state.reviews.splice(index, 1)
      return Object.assign({}, state, {
        reviews: state.reviews
      });
    }

    if (action.type === EDIT_REVIEW) {
      let currentReview = action.payload.review;

      let reviews = state.reviews;
      let index = reviews.indexOf(currentReview)
      let updatedReview = {
        name: currentReview.name,
        id: currentReview.id,
        time_created: currentReview.time_created,
        rating: action.payload.modalState.newRating,
        text: action.payload.modalState.newText,
        user: {
          image_url: userImage
        }
      }
      state.reviews[index] = updatedReview;
      return Object.assign({}, state, {
        reviews: state.reviews
      });
    }

    if (action.type === SAVE_RESTAURANT) {
      return Object.assign({}, state, {
        savedRestaurants: state.savedRestaurants.concat(action.payload)
      });
    }

    if (action.type === REMOVE_RESTAURANT) {
      let index;
      for (let i=0; i<state.savedRestaurants.length; i++) {
        if (state.savedRestaurants[i].restaurant.id === action.payload.restaurant.id) {
          index = i
        }
      }
      state.savedRestaurants.splice(index, 1)

      return Object.assign({}, state, {
        savedRestaurants: state.savedRestaurants
      });
    }

    return state;
  };
  
  export default rootReducer;