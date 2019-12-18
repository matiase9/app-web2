import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

import Auth from '../Auth/Auth';
import './Pages.css';
import authentification from '../../utils/auth';
//import PrivateRoute from '../PrivateRoute/PrivateRoute';



class Pages extends Component {

    state = {
        user: {
            email: {}
        }
    }

    refreshState = (data) => {
        this.setState({user:{email: data}});
    }

    onClickLogout = () => {
        console.log('lo borro');
        authentification.clearToken()
        this.setState({user:''});
       
    };

    render () {
        const {user} = this.state.user;
        return (
            <div>
                <header className="menu">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/auth">Auth</Link></li>
                        </ul>
                        {authentification.getToken() && <p>{user}</p>}
                        {authentification.getToken() && <button onClick={this.onClickLogout}>Logout</button>}
                    </nav>
                </header>
                <Switch>
                    {/* <PrivateRoute path="/" component={Auth} exact /> */}
                    <Route path="/" exact component={Dashboard}></Route>
                    <Route path="/auth" exact component={Auth}></Route>
                </Switch>
                
            </div>
        );
    }
}


export default Pages;