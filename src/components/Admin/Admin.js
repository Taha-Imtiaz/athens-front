import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class AdminPage extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token === null){
            loggedIn = false
        }
        this.state = {
            loggedIn
        }
    }
    
    render() {
        if (this.state.loggedIn === false){
            return <Redirect to = '/'/>
        }
        return (
            <div>
                <h1>This is admin page only authorized people may log in</h1>
                <Link to = '/signout'>Sign Out</Link>
            </div>
        );
    }
}

export default AdminPage