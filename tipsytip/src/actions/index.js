import { ADD_REVIEW } from "../constants/action-types";
import { REMOVE_REVIEW } from "../constants/action-types";
import { EDIT_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURANT } from "../constants/action-types";
import { REMOVE_RESTAURANT } from "../constants/action-types";


export function addReview(payload) {
    return { type: ADD_REVIEW, payload }
  };
  
export function removeReview(payload) {
  return { type: REMOVE_REVIEW, payload }
};

export function updateReview(payload) {
  return {type: EDIT_REVIEW, payload}
}

export function saveRestaurant(payload) {
  return { type: SAVE_RESTAURANT, payload }
};

export function removeRestaurant(payload) {
  return { type: REMOVE_RESTAURANT, payload}
}