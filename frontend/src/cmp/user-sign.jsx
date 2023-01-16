import { useSelector } from "react-redux"
import { LoginSignup } from "./Login-signup.jsx"

export function UserSign() {
    const user = useSelector((storeState) => storeState.userModule.user)
    return <section className="user-sign-area">
        {!user && <section className="login-form">
            <LoginSignup />
        </section>}
    </section>
}

