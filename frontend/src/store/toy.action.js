// import { toyService } from '../services/toy.service.js'
import { httpService } from '../services/http.service.js'
import { toyService } from '../services/toy-back.service.js'
import { store } from '../store/store.js'
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY, ADD_TOY_MSG } from '../store/toy.reducer.js'

export async function saveMsgToToy(msg, toyId) {
    try {
        const savedMsg = await toyService.addToyMsg(toyId, msg)
        console.log(savedMsg)
        // store.dispatch({type: ADD_TOY_MSG, })
    } catch (err) {
        console.log('Cannot add msg to toy', err)
    }

}

export async function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        const toyid = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyid })
    } catch (err) {
        console.log('Had issues Removing toy', err)
        throw err
    }
}

export async function loadToys(filterBy) {
    try {
        if (!filterBy) {
            const toys = await toyService.query()
            store.dispatch({ type: SET_TOYS, toys })
        } else {
            const toys = await toyService.query(filterBy)
            store.dispatch({ type: SET_TOYS, toys })
        }

    } catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    }
}

