
export function ToyPreview({ toy, navigate}) {

    function onMoveToDetails(toyId) {
        navigate(`/toy/${toyId}`)
    }
    return (
        <article className="toy-card">
            <h4>{toy.name}</h4>
            <img
                src={toy.url ? require(`../assets/toy-imgs/${toy.url}`)
                    : `https://robohash.org/${toy.name}?set=set2`}
                onClick={() => onMoveToDetails(toy._id)}
                title="Click me"
            />
            <p>Price: <span>{toy.price}</span></p>
            <p>In Stock? <span>{toy.inStock}</span></p>
        </article>
    )
}