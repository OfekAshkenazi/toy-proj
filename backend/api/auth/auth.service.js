const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const cryptr = new Cryptr('Secret-26ForEver')

const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(username, password) {
    logger.debug(`auth.service: ${username}`)
    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')

    // delete user.password
    return user
}

async function signup(username, fullname, password) {
    const saltRounds = 10
    logger.debug(`auth service`)
    if (!username || !fullname || !password) return Promise.reject('missing data not approve')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, fullname, password: hash })
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const userJson = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(userJson)
        return loggedinUser
    } catch (err) {
        logger.error('Cannot valid user', err)
    }
    return null
}

