import { Link, NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="full app-header">
        <nav className="header-nav flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/toy">Toys</NavLink>
            <NavLink to="/reviews">Reviews</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>

    </header>
}
