import React from "react";
import { Route, Redirect } from "react-router-dom";
import appRoutes from '../utils/roles';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
    // let { user } = props;
    // console.log(user)
    const isAuthenticated = (props) => {
        let token = localStorage.getItem('athens-token')
        // console.log(appRoutes, appRoutes['admin'], props)
        if (token) {
            // let index = appRoutes['admin'].findIndex(x => x == props.location.pathname)
            // if (index != -1) {
            //     return true
            // }
            // return false;
            return true;
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