import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { MsgPreview } from "../cmp/msg-preview";

import { reviewService } from "../services/review.service";
import { toyService } from "../services/toy-back.service"
import { utilService } from "../services/util.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { addReview, loadReviews, removeReview } from "../store/review.actions";

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [reviewToEdit, setReviewToEdit] = useState(reviewService.getEmptyReview())
    const [editToyMsg, setEditToyMsg] = useState(toyService.getEmptyMsg())
    const [reviews, setReviews] = useState([])
    const [msgs, setMsgs] = useState([])
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const [topic, setTopic] = useState(toyId)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        loadToy(toyId)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function loadToy(toyId) {
        try {
            let toy = await toyService.get(toyId)
            setToy(toy)
            setMsgs(toy.msgs)
            let reviews = await loadReviews()
            let toyReviews = reviews.filter(review => review.aboutToy.name === toy.name)
            setReviews(toyReviews)

        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    function handleChangeMsg({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setEditToyMsg({ ...editToyMsg, [field]: value })
    }

    async function onSaveToyMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addToyMsg(toyId, editToyMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            addMsg(savedMsg)
            setEditToyMsg(toyService.getEmptyMsg())
        } catch (err) {
            showErrorMsg('Cannot send msg')
        }
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        if (!reviewToEdit.txt) return
        try {
            await addReview({ ...reviewToEdit, toyId: toy._id })
            setReviewToEdit({ txt: '' })
            showSuccessMsg('Review Add')
        } catch (err) {
            showErrorMsg('Cannot Add Review')
        }
    }

    async function onRemove(reviewId) {
        try {
            await removeReview(reviewId)
            loadToy(toyId)
        } catch (err) {
            showErrorMsg('Cannot Remove Review')
        }
    }

    if (!toy || !reviews) return <h2>loading</h2>
    return (
        <section className="toy-details">
            <div className="toy-card-details">
                <h4>{toy.name}</h4>
                <img
                    src={toy.url ? require(`../assets/img/${toy.url}`)
                        : `https://robohash.org/${toy.name}?set=set2`} />
                <p>Price: {toy.price}</p>
                <p>{toy.labels}</p>
                <p>available: {toy.inStock ? 'yes' : 'no'}</p>
                <p>{utilService.formatTime(toy.createdAt)}</p>
            </div>
            <div className="toy-msg">
                <h4>Coustomer Chat</h4>
                <br />
                {msgs.length &&
                    <>
                        <ul>
                            {msgs.map(msg =>
                                <li key={msg.id}>
                                    <MsgPreview user={loggedInUser} msg={msg} />
                                </li>)}
                        </ul>

                    </>}
                <div className="input">
                    <form onSubmit={onSaveToyMsg}>
                        <input type="text" name="txt" id="txt" placeholder="Write something" onChange={handleChangeMsg} value={editToyMsg.txt} />
                        <button className="btn">save</button>
                    </form>
                </div>
            </div>
            <div className="review-box">
                <h3>Reviews: </h3>
                <hr />
                {reviews.length > 0 && <ul>
                    {reviews.map(review => <li key={review._id}>
                        <div className="flex">
                            <p>{review.txt}</p>
                            <button onClick={() => onRemove(review._id)}>x</button>
                        </div>

                    </li>)}
                </ul>}
                <form onSubmit={onAddReview}>
                    <input type="text" placeholder="Write review" name="txt" id="txt" onChange={handleChange} value={reviewToEdit.txt} />
                    <button>Add review</button>
                </form>
            </div>
        </section>
    )
}