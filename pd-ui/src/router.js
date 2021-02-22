import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './containers/login/login.page'
import HomePage from './containers/home/home.page'
import CurrencyPage from './containers/currencies/currency.page'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProfilePage from "./containers/profile/profile.page";

export default class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.requireAuth = this.requireAuth.bind(this);
    }

    loggedIn() {
        const {isLoggedIn} = this.props;
        return isLoggedIn;
    }

    requireAuth(nextState, replace) {
        if (!this.loggedIn()) {
            replace({
                pathname: '/login'
            });
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <PrivateRoute exact path="/home" component={HomePage}/>
                <PrivateRoute exact path="/profile" component={ProfilePage}/>
                <PrivateRoute exact path="/currency" component={CurrencyPage}/>
                <PrivateRoute exact path="/" component={CurrencyPage}/>
            </Switch>
        )
    }
}
