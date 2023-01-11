import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { toyService } from "../services/toy.service";
import { toyService } from "../services/toy-back.service"
import { utilService } from "../services/util.service";


export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadToy(toyId)
    }, [])

    function loadToy(toyId) {
        return toyService.get(toyId).then(setToy).catch(err => { console.log(err) })
    }

    if (!toy) return <h2>loading</h2>

    return (
        <section className="toy-details">
            <h4>{toy.name}</h4>
            <img
                src={toy.url ? require(`../assets/toy-imgs/${toy.url}`)
                    : `https://robohash.org/${toy.name}?set=set2`} />
            <p>Price: {toy.price}</p>
            <p>{toy.labels}</p>
            <p>available: {toy.inStock ? 'yes' : 'no'}</p>
            <p>{utilService.formatTime(toy.createdAt)}</p>
        </section>
    )
}