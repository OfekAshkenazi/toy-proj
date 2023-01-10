import { httpService } from './http.service.js'
const labels = ['On wheels', 'Box game', '"Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const BASE_URL = 'toy/'
export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

function query(filterBy) {
    const queryParams = `?name=${filterBy.name}&price=${filterBy.price}`
    return httpService.get(BASE_URL + queryParams)
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    }
    else {
        return httpService.post(BASE_URL, toy)
    }
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





// let filterToys = toys
// if (filterBy.name) {
//     const regex = new RegExp(filterBy.name, 'i')
//     filterToys = toys.filter(t => regex.test(t.name))
// }
// if (filterBy.inStock === 'forSale') {
//     filterToys = toys.filter(t => t.inStock === true)
// }
// return filterToys