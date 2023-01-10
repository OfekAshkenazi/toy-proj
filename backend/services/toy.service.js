const fs = require('fs');
var toys = require('../data/toy.json')

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filterToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filterToys = toys.filter(t => regex.test(t.name))
    }
    if (filterBy.inStock === 'forSale') {
        filterToys = toys.filter(t => t.inStock === true)
    }
    return Promise.resolve(filterToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('cannot find toy')
    else return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('cannot find toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToupdate = toys.find(currtoy => currtoy._id === toy._id)
        if (!toyToupdate) return Promise.reject('cannot find toy')
        toyToupdate.name = toy.name
        toyToupdate.price = toy.price
    }
    else {
        toy._id = _makeId()
        toy.createAt = Date.now()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}

function _makeId(length = 5) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}