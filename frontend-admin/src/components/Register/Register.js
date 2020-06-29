import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import axios from "axios";
import './Register.scss';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.onResetForm=this.onResetForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state= {
            email: '',
            username: '',
            password: '',
            passwordConf: '',
            submit: false
        };
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername = (username) => {
        this.setState({
            username: username.target.value
        });
    }

    onChangePassword = (password) => {
        this.setState({
            password: password.target.value
        });
    }

    onChangePasswordConf = (passwordConf) => {
        this.setState({
            passwordConf: passwordConf.target.value
        });
    }
    onResetForm = () => {
        this.setState({
            ...this.state,
            email: '',
            username: '',
            password: '',
            passwordConf: '',
        });
    }
    onSubmit = (e) => {
        e.preventDefault();

        const account = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            passwordConf: this.state.passwordConf
        }

        axios.post('http://localhost:3001/user/register', account)
        .then( res => {
            if(res.data["message"] === "New account created!") {
                this.setState({submit: true});
            }
        });
        this.setState({
            email: "",
            username: "",
            password: "",
            passwordConf: ""
        });
    }

    render () {
        return(
            !this.state.submit ? (
                <div>
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r"/>
                                <span className="r s"/>
                                <span className="r s"/>
                                <span className="r"/>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="mb-4">
                                            <i className="feather icon-user-plus auth-icon"/>
                                        </div>
                                        <h3 className="mb-4">Sign up</h3>
                                        <div className="input-group mb-3">
                                            <input type="email" className="form-control" placeholder="Email" required value={this.state.email} onChange={this.onChangeEmail} name="email"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Username" required value={this.state.username} onChange={this.onChangeUsername} name="username"/>
                                        </div>
                                        <div className="input-group mb-4">
                                            <input type="password" className="form-control" placeholder="Password" required value={this.state.password} onChange={this.onChangePassword} name="password"/>
                                        </div>
                                        <div className="input-group mb-4">
                                            <input type="password" className="form-control" placeholder="Confirm password" required value={this.state.passwordConf} onChange={this.onChangePasswordConf} name="passwordConf"/>
                                        </div>
                                        <button className="btn btn-info shadow-2 mb-4" type="submit">Sign up</button>
                                        <p className="mb-2 text-muted">Input again? <NavLink to="/resetRegister" onClick={this.onResetForm}>Reset</NavLink></p>
                                        <p className="mb-0 text-muted">Allready have an account? <NavLink to="/login">Login</NavLink></p>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

            ) : (
                <Redirect to={{ pathname: "/login", state: { from: "/register" } }} />
            ) 
        );
    }
}

export default Register;