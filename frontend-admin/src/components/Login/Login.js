import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './Login.scss';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state= {
      email: '',
      password: '',
      submit: false
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword = (password) => {
    this.setState({
      password: password.target.value
    });
  }
  
  onSubmit = (e) => {
    e.preventDefault();

    const account = {
      email: this.state.email,
      password: this.state.password
    }
    
    axios.post('http://conallserver.ddns.net:8000/user/login', account)
      .then((res) => {
        if (!res.data.error) {
          if(res.data.user["role"] === "admin") {
            sessionStorage.setItem("user",JSON.stringify(res.data.user))
            this.setState({submit: true})
          } else {
            return window.alert("Email is not authorized to access this website!!!")
          }
        } else {
          window.alert(res.data.error)
        }
      })
 
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      !this.state.submit ? (
        <div>
          <div className="auth-wrapper">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r" />
                <span className="r s" />
                <span className="r s" />
                <span className="r" />
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Login</h3>
                    <div className="input-group mb-3">
                      <input type="email" required className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} name="email" />
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" className="form-control" placeholder="password" required value={this.state.password} onChange={this.onChangePassword} name="password" />
                    </div>
                    <button className="btn btn-primary shadow-2 mb-4" type="submit ">Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      ) : ( 
        <Redirect to={{ pathname: "/allfilms", state: { from: "/login" } }} />
      )
    );
  }
}

export default Login;