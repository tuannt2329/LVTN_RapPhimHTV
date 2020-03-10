import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                email: null,
                username: null,
                password: null,
                passwordConf: null,
                role: null
            }
        }
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepasswordConf = this.onChangepasswordConf.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
    }

    onChangeemail = (e) => {
        var User = this.state.User;
        User["email"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangeusername = (e) => {
        var User = this.state.User;
        User["username"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangepassword = (e) => {
        var User = this.state.User;
        User["password"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangepasswordConf = (e) => {
        var User = this.state.User;
        User["passwordConf"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangerole = (e) => {
        var User = this.state.User;
        User["role"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
       
        const User = this.state.User;
        axios.post('http://localhost:3001/user/register', User)
        .then((res) => {
            if(res.data["message"] === "New account created!") {
                window.alert("New user created!");
                return window.location.reload();
            }
        });
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Add User</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                        <li className="breadcrumb-item active">AddUser</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-9 mx-auto d-block">
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#settings" data-toggle="tab">Thông tin User</a>
                                                </li>
                                            </ul>
                                        </div>{/* /.card-header */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="settings">
                                                    <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)} enctype="multipart/form-data">
                                                        <div className="form-group row">
                                                            <label htmlFor="inputUserName" className="col-sm-2 col-form-label">email</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputUserName" placeholder="email" onChange={this.onChangeemail}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Tên User</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputName" placeholder="Tên User" onChange={this.onChangeusername}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Password</label>
                                                            <div className="col-sm-10">
                                                                <input type="password" className="form-control" id="inputName2" placeholder="Password" onChange={this.onChangepassword}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Confirm password</label>
                                                            <div className="col-sm-10">
                                                                <input type="password" className="form-control" id="inputExperience" placeholder="Confirm password" onChange={this.onChangepasswordConf} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Role</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputName2" placeholder="admin/user" onChange={this.onChangerole}/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <a href="/allUsers" className="btn btn-secondary">Hủy</a>
                                                                <button type="submit" className="btn btn-success float-right">Thêm</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

}

export default AddUser;
