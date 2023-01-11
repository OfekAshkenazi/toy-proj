import { Link, NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="full app-header">
        <Link to="/"><h3>Home</h3></Link>
        <nav className="flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toy">toys list</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
        
    </header>
}
