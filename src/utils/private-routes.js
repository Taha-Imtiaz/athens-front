import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ user, roles, component: Component, ...rest }) {
  const isAuthenticated = (props) => {
    let token = localStorage.getItem("athens-token");
    if (token) {
      // return roles.includes(user.role)
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        return isAuthenticated(props) ? (
          user &&
            (roles.includes(user.role) ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            ))
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

var mapStateToProps = (state) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, null)(PrivateRoute);
