import { httpService } from "./http.service"
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
const LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    query,
    getById,
    remove,
    update,
    getEmptyCredentials
}

function query() {
    return httpService.get(BASE_URL)
}

async function getById(userId) {
    const user = await httpService.get(BASE_URL + `/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(BASE_URL +`/${userId}`)
}

async function update(userToUpdate) {
    const user = await httpService.put(BASE_URL + `/${userToUpdate._id}`, userToUpdate)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    const approve =  await httpService.post('auth/logout')
    if(!approve) return Promise.reject('not approve')
    sessionStorage.removeItem('loggedinUser')
    socketService.logout()

}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl , isAdmin: user.isAdmin}
    sessionStorage.setItem(LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER))
}

function getEmptyCredentials(fullname = '', username = '', password = '') {
    return { fullname, username, password }
}