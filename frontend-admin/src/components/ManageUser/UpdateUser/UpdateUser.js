import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: null
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
    }

    UNSAFE_componentWillMount() {
        var email = {email: sessionStorage.getItem('email')};
        axios.post("http://htvcinemas.live:8000/user/find", email)
            .then((res) => {
                this.setStateUsers(res.data.user[0]);
            });
    }

    setStateUsers = (User) => {
        this.setState({ User });
    }

    onChangeFirstName = (e) => {
        var User = this.state.User;
        User["firstName"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangeLastName = (e) => {
        var User = this.state.User;
        User["lastName"] = e.target.value;
        this.setState({
            User: User
        });
    }

    onChangegender = (e) => {
        var User = this.state.User;
        User["gender"] = e.target.value;
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
        axios.put('http://htvcinemas.live:8000/user/updateInfo', User)
        .then((res) => {
            if (!res.data.error) {
                window.alert("update your information success!")
                return window.location.reload()
            } else {
                return window.alert(res.data.error)
            }
        });
    }

    render() {
        console.log(this.state.User)
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
                                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">first name</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName" placeholder="firstname" defaultValue={this.state.User["firstName"]} onChange={this.onChangeFirstName}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">last name</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName" placeholder="lastname" defaultValue={this.state.User["lastName"]} onChange={this.onChangeLastName}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">gender</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName" placeholder="gender" defaultValue={this.state.User["gender"]} onChange={this.onChangegender}/>
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
