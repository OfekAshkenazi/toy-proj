import { useSelector } from "react-redux";
import { logout } from "../store/user.action";

export function WellcomeUser() {
    const user = useSelector((storeState) => storeState.userModule.user)
    function onLogout() {
        logout()
    }

    return (
        <>
            {user && < section className="user-header flexC">
                <h3>{user.fullname}</h3>
                <button onClick={onLogout}>Logout</button>
            </ section >}
        </>
    )
}