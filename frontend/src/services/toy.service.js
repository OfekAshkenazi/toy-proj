import { utilService } from "./util.service"
import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = 'toyDb'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}
_createToys()


function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filterToys = toys
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                filterToys = toys.filter(t => regex.test(t.name))
            }
            if (filterBy.inStock === 'forSale') {
                filterToys = toys.filter(t => t.inStock === true)
            }
            return filterToys
        })
}

function get(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function _createToys() {
    let toys = storageService.oldGet(STORAGE_KEY)
    if (!toys) {
        toys = [
            {
                _id: utilService.makeId(),
                name: 'gabbys dollhouse',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'baz',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'lilo',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'stich',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'stichdouble',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ['On wheels', 'Box game', 'Art'],
                createdAt: Date.now(),
                inStock: false
            },
            {
                _id: utilService.makeId(),
                name: 'stichdoublesss',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: [ 'Baby', 'Doll', 'Puzzle'],
                createdAt: Date.now(),
                inStock: false
            },
            {
                _id: utilService.makeId(),
                name: 'stichdoubleaaaa',
                price: utilService.getRandomIntInclusive(50, 120),
                labels: ['Puzzle', 'Outdoor', 'Battery Powered'],
                createdAt: Date.now(),
                inStock: false
            },

        ]
        storageService.oldSave(STORAGE_KEY, toys)
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


