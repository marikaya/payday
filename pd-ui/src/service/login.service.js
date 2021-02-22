import { withRouter } from 'react-router-dom';
import {loginError, userLoggedIn, userLogout} from '../action/login.action';
import history from '../history';
import store from '../store';

const logoutUser = () => {
    
    sessionStorage.clear();
    store.dispatch(userLogout)
    window.location.href = "";

    history.push("/");
};


export default logoutUser;