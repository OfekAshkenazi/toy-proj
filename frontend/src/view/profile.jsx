import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ReviewList } from "../cmp/review-list";
import { UserSign } from "../cmp/user-sign";
import { WellcomeUser } from "../cmp/wellcome-user";

import { loadReviews } from "../store/review.actions";

export function Profile() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (!user) return
        onLoadReviewForUser()
    }, [user])

    async function onLoadReviewForUser() {
        const reviews = await loadReviews()
        let userReviews = reviews.filter(review => review.byUser._id === user._id)
        setReviews(userReviews)
    }

    return (
        <>
            <section className="user-sign-area">
                <WellcomeUser />
                <UserSign />
            </section>
            <section>
                <h3>Reviews:</h3>
                {reviews.length > 0 && <ReviewList reviews={reviews} />}
            </section>
        </>
    )
}