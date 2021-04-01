import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function PrivateRoute({ user, roles, component: Component, ...rest }) {
    
        
    const isAuthenticated = (props) => {
        let token = localStorage.getItem('athens-token')
        if (token && user) {
            return roles.includes(user.role)
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
                    user ? (user.role == 'admin' ? <Redirect to="/customers" /> : <Redirect to="/movers" />) : <Redirect to="/" />
                   
                    /* if(user.role == "admin"){
                        redirect to="/customer"
                    } else if(user.role == "mover"){
                        redirect to="/movers"
                    }
                    else{
                        redirect to="/"
                    }
                     */
                    
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