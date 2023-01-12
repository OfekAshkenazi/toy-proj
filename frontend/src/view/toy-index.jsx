import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToyFilter } from "../cmp/toy-filter.jsx";
import { ToyList } from "../cmp/toy-list";

import { toyService } from "../services/toy-back.service.js";

import { loadToys, removeToy } from "../store/toy.action";
import { SET_FILTER } from "../store/toy.reducer";

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = toyService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])

    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        return dispatch({ type: SET_FILTER, filterBy })
    }

    function onLoadToys(filterBy) {
        try { loadToys(filterBy) } catch (err) { console.log('error') }
    }

    function onRemoveToy(toyId) {
        try { removeToy(toyId) } catch (err) { console.log(err) }
    }

    function onGoToAdd() {
        navigate('/toy/edit')
    }

    return (
        <section>
            <ToyFilter filterBy={queryFilterBy} onSetFilter={onSetFilter} />
            <button className="btn" onClick={onGoToAdd}>Add toy</button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </section>
    )
}