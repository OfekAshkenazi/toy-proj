import { httpService } from './http.service'
import { userService } from './user.service'
import { getActionRemoveReview, getActionAddReview } from '../store/review.actions'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

(() => {
  socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      store.dispatch(getActionAddReview(review))
  })
})()


export const reviewService = {
  add,
  query,
  remove,
  getEmptyReview
}
function getEmptyReview() {
  const review = {
    userId: '',
    toyId: '',
    txt: ''
  }
  return review
}

function query() {
  // let queryStr = (!filterBy) ? '' : `?name=${filterBy.name}`
  return httpService.get(`review`)
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}

async function add(review) {
  const addedReview = await httpService.post(`review`, review)
  return addedReview
}