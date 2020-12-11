import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav" style={{ display: "flex", alignItems: "flex-start", marginLeft: "5%" }}>
                <li className="navbar-item">
                    <h4><Link style={{ paddingRight: 35, color: "#fff" }}  to="/" className="nav-link">clients</Link></h4>
                </li>
                <li className="navbar-item">
                <h4><Link style={{ color: "#fff" }} to="/add" className="nav-link">add client</Link></h4>
                </li>
            </ul>
        </nav>
    )

}

export default NavBar