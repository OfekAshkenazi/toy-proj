const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const collection_url = 'toys'

module.exports = {
    query,
    get,
    add,
    update,
    remove,
    // addCarMsg,
    // removeCarMsg
}

async function query(filterBy = { name: '' }) {
    try {
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' }
        }
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }

}

async function get(toyId) {
    console.log(toyId)
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error('Cannot find toy', err)
        throw err
    }

}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        toy.createAt = Date.now()
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy `, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}


// function save(toy) {
//     if (toy._id) {
//         const toyToupdate = toys.find(currtoy => currtoy._id === toy._id)
//         if (!toyToupdate) return Promise.reject('cannot find toy')
//         toyToupdate.name = toy.name
//         toyToupdate.price = toy.price
//     }
//     else {
//         toy._id = _makeId()
//         toy.createAt = Date.now()
//         toys.push(toy)
//     }
//     return _writeToysToFile().then(() => toy)
// }

//// old function for server
// function _writeToysToFile() {
//     return new Promise((res, rej) => {
//         const data = JSON.stringify(toys, null, 2)
//         fs.writeFile('data/toy.json', data, (err) => {
//             if (err) return rej(err)
//             res()
//         })
//     })
// }

// function _makeId(length = 5) {
//     let text = ''
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return text
// }