import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function PrivateRoute({ user, roles, component: Component, ...rest }) {
    const isAuthenticated = (props) => {
        let token = localStorage.getItem('athens-token')
        if (token && user) {
            console.log(user.role)
            return roles.includes(user.role)
        }
        return false;
    };
    return (
        <Route
            {...rest}
            render={props => {
                console.log(props)
                return isAuthenticated(props) ? (
                    <Component {...props} />
                ) : (
                    user ? (user.role == 'mover' ? <Redirect to="/mover" /> : <Redirect to="/customers" />) : <Redirect to="/" />
                )
            }
            }
        />
    );
}

var mapStateToProps = (state) => ({
    user: state.users.user
});
export default connect(mapStateToProps, null)(PrivateRoute);