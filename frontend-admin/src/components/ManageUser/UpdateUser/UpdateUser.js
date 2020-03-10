import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: null
        }
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
    }

    UNSAFE_componentWillMount() {
        var email = {email: sessionStorage.getItem('email')};
        axios.post("http://localhost:3001/user/getUserByEmail", email)
            .then((res) => {
                this.setStateUsers(res.data[0]);
            });
    }

    setStateUsers = (User) => {
        this.setState({ User });
    }

    onChangeusername = (e) => {
        var User = this.state.User;
        User["username"] = e.target.value;
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
        axios.put('http://localhost:3001/user/update', User)
        .then((res) => {
            if(res.data["message"] === "update user success!") {
                window.alert("update user success!");
                return window.location.reload();
            }
        });
    }

    render() {
        if(this.state.User) {
            return (
                <div>
                    <Menu />
                    <div className="content-wrapper">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Update User</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                            <li className="breadcrumb-item active">UpdateUser</li>
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
                                                        <a className="nav-link" href="" data-toggle="tab">Thông tin user</a>
                                                    </li>
                                                </ul>
                                            </div>{/* /.card-header */}
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="active tab-pane" id="settings">
                                                        <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                                            <div className="form-group row">
                                                                <label htmlFor="inputUserName" className="col-sm-2 col-form-label">email</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputUserName" placeholder="User Name" defaultValue={this.state.User["email"]} disabled/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">User name</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName" placeholder="username" defaultValue={this.state.User["username"]} onChange={this.onChangeusername}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputName2" className="col-sm-2 col-form-label">Role</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName2" placeholder="role" defaultValue={this.state.User["role"]} onChange={this.onChangerole}/>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <a href="/allusers" className="btn btn-secondary">Cancel</a>
                                                                    <button type="submit" className="btn btn-success float-right">Update</button>
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
        return (
            <div></div>
        );

    }
}

export default UpdateUser;
