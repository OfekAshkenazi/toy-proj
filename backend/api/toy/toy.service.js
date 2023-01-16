const ObjectId = require('mongodb').ObjectId

const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { makeId } = require('../../services/util.service')

module.exports = {
    query,
    get,
    add,
    update,
    remove,
    addToyMsg,
    // removeCarMsg
}

async function query(filterBy = { name: '' }) {
    var test = 2
    inStock = filterBy.inStock ? true : false
    try {
        const collection = await dbService.getCollection('toys')
        if (!filterBy) {
            var toys = await collection.find().limit(test * 4).toArray()
            return toys
        } else {
            const criteria = {
                name: { $regex: filterBy.name, $options: 'i' },
            }
            var toys = await collection.find(criteria).toArray()
            return toys
        }
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
    } catch (err) { logger.error('Cannot find toy', err); throw err }

}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        toy.createAt = Date.now()
        await collection.insertOne(toy)
        return toy
    } catch (err) { logger.error('cannot insert car', err); throw err }
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
    } catch (err) { logger.error(`cannot update toy `, err); throw err }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) { logger.error(`cannot remove toy ${toyId}`, err); throw err }
}

async function addToyMsg(toyId, msg, loggedinUser) {
    try {
        const msgToSave = {
            txt: msg.txt,
            id: msg.id,
            by: {
                fullname: loggedinUser.fullname,
                _id: loggedinUser._id
            },
            from: msg.from
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msgToSave } })
        return msgToSave
    } catch (err) {
        logger.error('Cannot add msg to toy')
        throw err
    }
}