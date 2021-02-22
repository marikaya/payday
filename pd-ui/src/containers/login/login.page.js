import React from "react";
import LoginForm from "../../forms/login/login.form";
import LayoutSecondary from "../../components/LayoutSecondary/LayoutSecondary";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import history from "../../history";
import "./login.page.less";
import {login} from "../../api/login.api";
import {withRouter} from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
            errorMessage: '',
            submitted: false,
        };
    }

    onFinished = values => {
        this.props.login({
            email: values.email,
            password: values.password
        }).then(data => {
            this.props.history.push("/currency")
        }).catch(error => {
            console.log(error)
        })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <LayoutSecondary>
                <h3 className={"login-title"}>Payday</h3>
                <div className={"form-wrapper"}>
                    <LoginForm onFinished={this.onFinished} onFinishFailed={this.onFinishFailed}/>
                </div>
            </LayoutSecondary>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.isLoggedIn,
        loading: state.data.loading
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login,
    }, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))