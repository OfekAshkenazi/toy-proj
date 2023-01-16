import { reviewService } from '../services/review.service'
import { store } from '../store/store.js'

export function getActionRemoveReview(reviewId) {
  return { type: 'REMOVE_REVIEW', reviewId }
}
export function getActionAddReview(review) {
  return { type: 'ADD_REVIEW', review }
}
export function getActionSetWatchedUser(user) {
  return { type: 'SET_WATCHED_USER', user }
}
export function getActionAllReview(reviews) {
  return { type: 'SET_REVIEWS', reviews }
}
export async function loadReviews() {
  try {
    const reviews = await reviewService.query()
    store.dispatch(getActionAllReview(reviews))
    return reviews
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch(getActionAddReview(addedReview))
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}