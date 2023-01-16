export function ReviewList({ reviews }) {
    return (
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review._id}>
                    <article className="review-preview">
                        <h3>By: {review.byUser.username}</h3>
                        <h4>On : {review.aboutToy.name}</h4>
                        <p>{review.txt}</p>
                    </article>
                </li>)}
        </ul>
    )
}