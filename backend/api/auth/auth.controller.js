const authService = require('./auth.service')
const logger = require('../../services/logger.service')


module.exports = {
    login,
    signup,
    logout
}

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        console.log(user)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Cannot login', err)
        res.status(500).send({ err: 'Cannot login' })
    }
}

async function signup(req, res) {
    try {
        const { username, fullname, password } = req.body
        const account = await authService.signup(username, fullname, password)
        logger.debug('new user :)' + account)
        const user = await authService.login(username, fullname, password)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Cannot signup', err)
        res.status(500).send({ err: 'Cannot signup' })
    }

}
async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) { res.status(500).send({ err: 'Cannot logout' }) }
}