import React from 'react'
import style from './navbar.module.css'
// import logo from '/images/movers-logo.jpg'
import { Link, withRouter } from "react-router-dom";

const Navbar = (props) => {

    const getNavLinkClass = path => {
        console.log(props.location.pathname)
        return props.location.pathname === path
            ? "nav-item active"
            : "nav-item";
    };

    return (
        <nav className={`navbar navbar-expand-md navbar-light ${style.elevation}`}>
            <Link className={`navbar-brand ${style.logo}`} to="/customer">
            <img src='/images/movers-logo.jpg' width="60px"></img>
                        </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav ml-auto">
                    <li className={getNavLinkClass("/customer")}>
                        <Link className={`nav-link`} to="/customer">
                            Customer
                        </Link>

                    </li>
                    <li className={getNavLinkClass("/job")}>
                        <Link className="nav-link" to="/job">
                            Jobs
                        </Link>
                    </li>
                    <li className={getNavLinkClass("/schedule")}>
                        <Link className="nav-link" to="/schedule">
                            Schedule
                        </Link>
                    </li>
                    <li className={getNavLinkClass("/user")}>
                        <Link className="nav-link" to="/user">
                            Users
                        </Link>
                    </li>
                    <li className={getNavLinkClass("/account")}>
                        <Link className="nav-link" to="/account">
                            Account
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
export default withRouter(Navbar)