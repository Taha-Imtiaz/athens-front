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
    console.log(props)

    return (
        <nav className={`navbar navbar-expand-md navbar-light ${style.elevation} sticky-top`}>
            <Link className={`navbar-brand ${style.logo}`} to="/">
                <img src='/images/movers-logo.jpg' width="60px"></img>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav ml-auto">
                    {!props.location.pathname.startsWith("/mover") ?
                        <React.Fragment>
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
                        </React.Fragment> 
                        :
                        <React.Fragment>
                        <li className={getNavLinkClass("/mover")}>
                        <Link className="nav-link" to="/mover">
                            Jobs
                        </Link>
                    </li>
                        <li className={getNavLinkClass("/mover/calendar")}>
                            <Link className="nav-link" to="/mover/calendar">
                                Calendar
                             </Link>
                        </li>
                        
                    </React.Fragment>
                    }
                </ul>
            </div>
        </nav>

    )
}
export default withRouter(Navbar)