import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Store from './store'
import Routes from './router'
import browserHistory from './history';
import ApiService from "./apiservice";

export const dataService = new ApiService(Store);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <Router history={browserHistory}>
                    <Routes/>
                </Router>
            </Provider>
        )
    }
}