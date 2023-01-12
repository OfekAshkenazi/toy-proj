// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy-back.service.js'
import { store } from '../store/store.js'
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from '../store/toy.reducer.js'

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
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })

    } catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    }
}

// export function loadToys(filterBy) {
//     return toyService.query(filterBy)
//         .then((toys) => {
//             store.dispatch({ type: SET_TOYS, toys })
//         })
//         .catch(err => {
//             console.log('Had issues loading toys', err)
//             throw err
//         })
// }

// export function removeToy(toyId) {
//     return toyService.remove(toyId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_TOY, toyId })
//         })
//         .catch(err => {
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }