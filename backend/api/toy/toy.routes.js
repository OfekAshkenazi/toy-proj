const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, get, addToy, updateToy, removeToy, addToyMsg} = require('./toy.controller')
const router = express.Router()


router.get('/', log, getToys)
router.get('/:id', get)
router.post('/', addToy) //requireAuth
router.put('/:id', updateToy) //requireAuth
router.delete('/:id', removeToy) //, requireAuth
// router.delete('/:id', removeCar) ///, requireAuth, requireAdmin

router.post('/:id/msg', requireAuth, addToyMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router