import React from 'react'
import style from './navbar.module.css'
// import logo from '/images/movers-logo.jpg'
import { Link, withRouter } from "react-router-dom";

const Navbar = (props) => {

    const getNavLinkClass = path => {
        return props.location.pathname === path
            ? "nav-item active"
            : "nav-item";
    };
    console.log(props)

    return (
        <nav className={`navbar navbar-expand-md navbar-light ${style.elevation} sticky-top`}>
            <Link className={`navbar-brand ${style.logo}`} to="/">
                <img src='/images/movers-logo.jpg' width="60px" alt = "Logo"></img>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav ml-auto">
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
                            {/* <li className={getNavLinkClass("/schedule")}>
                                <Link className="nav-link" to="/schedule">
                                    Schedule
                        </Link>
                            </li> */}
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
                            <li className={getNavLinkClass("/claim/customer")}>
                                <Link className="nav-link" to="/claim/customer">
                                    Claims
                        </Link>
                            </li>
                            <li className={getNavLinkClass("/claim/customerdeposit")}>
                                <Link className="nav-link" to="/claim/customerdeposit">
                                    Blankets
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