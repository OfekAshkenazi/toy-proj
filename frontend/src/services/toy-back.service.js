import { httpService } from './http.service.js'
const labels = ['On wheels', 'Box game', '"Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const BASE_URL = 'toy/'
export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams
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

function query(filterBy) {
    if(!filterBy) return httpService.get(BASE_URL)
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}`
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