const ObjectId = require('mongodb').ObjectId
const dbService = require('../../services/db.service')

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).sort({ username: -1 }).toArray()

        users = users.map(user => {
            delete user.password
            user.isToyLover = true
            user.createdAt = ObjectId(user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) { logger.error('Cannot get users', err); throw err }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password
        return user
    } catch (err) { logger.error('Cannot get userById', err); throw err }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) { logger.error('Cannot get userByName', err); throw err }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) { logger.error('Cannot remove user', err); throw err }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave }, { $set: userToSave })
        return userToSave
    } catch (err) { logger.error('Cannot update user', err); throw err }
}

async function add({ username, fullname, password}) {
    try {
        const userToAdd = {
            username,
            password,
            fullname
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) { logger.error('Cannot add user', err); throw err }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }

    return criteria
}

