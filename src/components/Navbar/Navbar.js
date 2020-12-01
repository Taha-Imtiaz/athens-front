import React, { useEffect } from "react";
import style from "./navbar.module.css";
// import logo from '/images/movers-logo.jpg'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { getLoginUser } from "../../Redux/User/userActions";
import Button from "@material-ui/core/Button";

const Navbar = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("athens-token");
    if (token) {
      // console.log('Inside')
      var { getLoginUser } = props;
      getLoginUser();
    }
  }, []);

  var { user } = props;

  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? "nav-item active" : "nav-item";
  };
  var logOut = () => {
    localStorage.clear();
    // props.history.push('/')
    window.location.reload(false);
  };
  return (
    <nav
      className={`navbar navbar-expand-md navbar-light ${style.elevation} sticky-top`}
    >
      <Link className={`navbar-brand ${style.logo}`} to="/">
        <img src="/images/movers-logo.jpg" width="60px" alt="Logo"></img>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {props.user ? (
          <ul className="navbar-nav ml-auto">
            {props.user.role != "mover" ? (
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
                <li className={getNavLinkClass("/calendar")}>
                  <Link className="nav-link" to="/calendar">
                    Calendar
                  </Link>
                </li>
                <li className={getNavLinkClass("/schedule/daily")}>
                  <Link className="nav-link" to="/schedule/daily">
                    Schedule
                  </Link>
                </li>
                {props.user.role != "manager" ? (
                  <li className={getNavLinkClass("/user")}>
                    <Link className="nav-link" to="/user">
                      Users
                    </Link>
                  </li>
                ) : null}
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
                <li>
                  <Button
                    style={{
                      background: "#00ADEE",
                      border: "transparent",
                      color: "#ffffff",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      fontFamily: "sans-serif",
                      textTransform: "none",
                    }}
                    onClick={logOut}
                  >
                    Log Out
                  </Button>
                </li>
              </React.Fragment>
            ) : (
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
                  <li>
                    {/* <Button variant="contained" color="primary" onClick={logOut}>
                    Log Out
                  </Button> */}
                    <Button
                      style={{
                        background: "#00ADEE",
                        border: "transparent",
                        color: "#ffffff",
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        fontFamily: "sans-serif",
                        textTransform: "none",
                      }}
                      onClick={logOut}
                    >
                      Log Out
                  </Button>
                  </li>
                </React.Fragment>
              )}
          </ul>
        ) : (
            <ul className="navbar-nav ml-auto">
              <React.Fragment>
                <li className={getNavLinkClass("/")}>
                  <Link className={`nav-link`} to="/">
                    Sign In
                </Link>
                </li>
              </React.Fragment>
            </ul>
          )}
      </div>
    </nav>
  );
};

// var actions = {
//     login
// }

const action = {
  getLoginUser,
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});

export default compose(withRouter, connect(mapStateToProps, action))(Navbar);
