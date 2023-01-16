import { userService } from "../services/user.service.js";
import { store } from "./store.js";
import { SET_USER, UPDATE_USER } from "./user.reducer.js";

export async function update(user) {
    try {
        const userToSave = userService.update(user)
        store.dispatch({ type: UPDATE_USER, user: userToSave })

    } catch (err) {
        throw err
    }
}

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('Cannot signup')
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => { store.dispatch({ type: SET_USER, user: null }) })
        .catch(err => {
            console.log('Cannot logout', err)
            throw err
        })
}