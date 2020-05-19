import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usrname: null
        };
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("user");
        this.setState({ usrname: null });
        return window.location = '/';
    }
    
    UNSAFE_componentWillMount() {
        this.isLocalStorage();
    }

    isLocalStorage = () => {
        if (JSON.parse(sessionStorage.getItem('user')) != null) {
            var username = JSON.parse(sessionStorage.getItem('user'))["firstName"] ?
                JSON.parse(sessionStorage.getItem('user'))["firstName"] : null;
        }
        this.setState({ usrname: username });
        if(!username)
        return window.location = '/';
    }

    render() {
        return (
            <div >
                <Header />
                <aside className="main-sidebar sidebar-dark-primary elevation-4 ">
                    {/* Brand Logo */}
                    <a href="/menu" className="brand-link">
                        <span className="brand-text font-weight-light">Admin Manage</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="info">
                                <a href="/menu" className="d-block">Admin: {this.state.usrname}</a>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                {/* ManageUser */}
                                <li className="nav-item has-treeview">
                                    <a href="" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Manage User
                                    <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="/allusers" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>All Users</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/adduser" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Add User</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/allusers" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Edit User</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* ManageFilm */}
                                <li className="nav-item has-treeview">
                                    <a href="" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>Manage Film
                                    <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="/allfilms" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>All Films</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/addfilm" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Add Film</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/allfilms" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Edit Film</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item has-treeview">
                                    <a href="" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>Manage Schedule
                                    <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="/allfilmsshedule" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>All films</p>
                                            </a>
                                        </li>
                                        
                                        <li className="nav-item">
                                            <a href="/allfilmsshedule" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Edit Schedule</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item has-treeview">
                                    <a href="" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Statistical Revenue
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="/statisticalrevenue" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Chart Statistical Revenue</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <center>
                                    <li className="nav-item has-treeview">
                                        <a href="/" className="d-block" onClick={this.onLogout.bind(this)} className="nav-link">
                                            <p>Logout</p>
                                        </a>
                                    </li>
                                </center>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                <Footer />
            </div>
        );
    }

}

export default Menu;
