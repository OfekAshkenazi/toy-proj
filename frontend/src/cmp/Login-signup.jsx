
import { useState } from 'react'
import { LoginForm } from './login-form.jsx'

import { login, signup } from "../store/user.action.js"

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)
    function onLogin(credentials) {
        isSignup ? signup(credentials) : login(credentials)
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <button onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </button >
            </div>
        </div >
    )
}