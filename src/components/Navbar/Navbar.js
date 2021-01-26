import React, { useEffect } from "react";
import style from "./navbar.module.css";
// import logo from '/images/movers-logo.jpg'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { getLoginUser } from "../../Redux/User/userActions";
import Button from "@material-ui/core/Button";

const Navbar = (props) => {
  var { getLoginUser } = props;

  useEffect(() => {
    const token = localStorage.getItem("athens-token");
    if (token) {
      getLoginUser();
    }
  }, [getLoginUser]);

  var {
    history: {
      location: { pathname },
    },
  } = props;

  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? "nav-item active" : "nav-item";
  };
  var logOut = () => {
    localStorage.clear();

    window.location.reload(false);
  };
  return (
    <div>
      {pathname !== "/" && (
        <nav
          className={`navbar navbar-expand-md navbar-light ${style.elevation} ${style.fixedNavBar} sticky-top sticky-top`}
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
                {props.user.role !== "mover" ? (
                  <React.Fragment>
                    <li className={getNavLinkClass("/customers")}>
                      <Link className={`nav-link`} to="/customers">
                        Customer
                      </Link>
                    </li>
                    <li className={getNavLinkClass("/jobs")}>
                      <Link className="nav-link" to="/jobs">
                        Jobs
                      </Link>
                    </li>
                    <li className={getNavLinkClass("/calendar")}>
                      <Link className="nav-link" to="/calendar">
                        Calendar
                      </Link>
                    </li>
                    <li className={getNavLinkClass("/schedule")}>
                      <Link className="nav-link" to="/schedule">
                        Schedule
                      </Link>
                    </li>
                    {props.user.role !== "manager" ? (
                      <li className={getNavLinkClass("/users")}>
                        <Link className="nav-link" to="/users">
                          Users
                        </Link>
                      </li>
                    ) : null}
                    <li className={getNavLinkClass("/account")}>
                      <Link className="nav-link" to="/account">
                        Account
                      </Link>
                    </li>
                    <li className={getNavLinkClass("/claims")}>
                      <Link className="nav-link" to="/claims">
                        Claims
                      </Link>
                    </li>
                    <li className={getNavLinkClass("/deposits")}>
                      <Link className="nav-link" to="/deposits">
                        Blankets
                      </Link>
                    </li>
                    <li className={style.logoutBtn}>
                      <Button className={style.button} onClick={logOut}>
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
                    <li className={style.logoutBtn}>
                      <Button className={style.button} onClick={logOut}>
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
      )}
    </div>
  );
};

const action = {
  getLoginUser,
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});

export default compose(withRouter, connect(mapStateToProps, action))(Navbar);
