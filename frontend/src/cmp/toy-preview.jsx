export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>{toy.price}</span></p>
            <p>In Stock? <span>{toy.inStock}</span></p>
        </article>
    )
}