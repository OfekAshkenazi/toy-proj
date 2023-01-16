const userService = require('./user.service')
const logger = require('../../services/logger.service')

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Cannot get user', err)
        res.status(500).send({ err: 'Cannot get user' })
    }
}

async function getUsers(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.name || '',
        // }
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        logger.error('Cannot get users', err)
        res.status(500).send({ err: 'Cannot get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Delete' })
    } catch (err) {
        logger.error('Cannot delete user', err)
        res.status(500).send({ err: 'Cannot delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Cannot update user', err)
        res.status(500).send({ err: 'Cannot update user' })
    }
}


