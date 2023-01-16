import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'
const labels = ['On wheels', 'Box game', '"Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const BASE_URL = 'toy'
export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    addToyMsg,
    getEmptyMsg
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

async function query(filterBy) {
    let List
    let queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}`
    try {
        if (!filterBy) {
            List = await httpService.get(BASE_URL)
            return List
        } else {
            List = httpService.get(BASE_URL + queryParams)
            return List
        }

    } catch (err) { console.log(err) }
}

async function get(toyId) {
    try {
        const Get = await httpService.get(BASE_URL + `/${toyId}`)
        return Get
    } catch (err) { console.log(err) }

}

async function remove(toyId) {
    try {
        const Delete = await httpService.delete(BASE_URL + `/${toyId}`)
        return Delete
    } catch (err) { console.log(err) }
}

async function save(toy) {
    var savedToy
    if (toy._id) {
        savedToy = await httpService.put(BASE_URL + `/${toy._id}`, toy)
    }
    else {
        savedToy = await httpService.post(BASE_URL, toy)
    }
    return savedToy
}

async function addToyMsg(toyId, msg) {
    const savedMsg = await httpService.post(BASE_URL + `/${toyId}/msg`, msg)
    return savedMsg
}

function getEmptyToy() {
    const toy = {
        name: '',
        price: '',
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: Date.now(),
        inStock: true
    }
    return toy
}

function getEmptyMsg() {
    const msg = {
        id: utilService.makeId(),
        txt: '',
       
    }
    return msg
}