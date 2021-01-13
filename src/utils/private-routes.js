import React from "react";
import { Route, Redirect } from "react-router-dom";
import appRoutes from '../utils/roles';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = (props) => {
        let token = localStorage.getItem('athens-token')
        if (token) {
            return true;
        }
        return false;
    };

    return (
        <Route
            {...rest}
            render={props => {
                return isAuthenticated(props) ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/" />
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