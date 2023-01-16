const toyService = require('./toy.service.js')
const logger = require('../../services/logger.service')
const { makeId } = require('../../services/util.service.js')


module.exports = {
    getToys,
    get,
    addToy,
    updateToy,
    removeToy,
    addToyMsg,
    // removeCarMsg
}

async function getToys(req, res) {
    try {
        logger.debug('export toys')
        const filterBy = req.query
        const toys = await toyService.query(filterBy)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function get(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.get(toyId)
        console.log(toy)
        res.json(toy)

    } catch (err) {
        logger.error('Cannot find toy', err)
        res.status(500).send({ err: 'Cannot find toy' })
    }
}

async function addToy(req, res) {
    // const {loggedinUser} = req
    try {
        const toy = req.body
        // toy.owner = loggedinUser
        const addedToy = await toyService.add(toy)
        return res.json(addedToy)
    } catch (err) {
        logger.error('Cannot add toy', err)
        res.status(500).send({ err: 'Cannot add toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Cannot update toy', err)
        res.status(500).send({ err: 'Canoot update toy' })
    }
}

async function removeToy(req, res) {
    try {
        const toyId = req.params.id
        const removeId = await toyService.remove(toyId)
        res.send(removeId)
    } catch (err) {
        logger.error('Cannot remove toy', err)
        res.status(500).send({ err: 'Cannot remove toy' })
    }
}

async function addToyMsg(req, res) {
    const { loggedinUser } = req
    try {
        const toyId = req.params.id
        const  msg  = req.body

        const savedMsg = await toyService.addToyMsg(toyId, msg, loggedinUser)
        res.json(savedMsg)
    } catch (err) {
        logger.error('Cannot add msg', err)
        res.status(500).send({ err: 'Cannot add msg' })
    }
}