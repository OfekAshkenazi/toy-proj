import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToyFilter } from "../cmp/toy-filter.jsx";
import { ToyList } from "../cmp/toy-list";

import { loadToys, removeToy, setFilter } from "../store/toy.action";
import { SET_FILTER } from "../store/toy.reducer";

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])

    function onSetFilter(filterBy) {
        return dispatch({ type: SET_FILTER, filterBy })
    }

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .catch(err => {
                console.log(err)
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .catch(err => {
                console.log(err)
            })
    }

    function onGoToAdd() {
        navigate('/toy/edit')
    }

    return (
        <section>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <button onClick={onGoToAdd}>add toy</button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </section>
    )
}