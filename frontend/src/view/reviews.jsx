import { useEffect } from "react"
import { useSelector } from "react-redux"

import { FilterReview } from "../cmp/filter-review"
import { ReviewList } from "../cmp/review-list"

import { loadReviews } from '../store/review.actions'

export function Reviews() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    return (
        <section>
            <FilterReview />
            <ReviewList reviews={reviews} />
        </section>
    )
}