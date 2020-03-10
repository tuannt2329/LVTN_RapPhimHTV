import React, { Component } from 'react';

class DetailUser extends Component {
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Profile User</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">User Profile</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* Profile Image */}
                                    <div className="card card-primary card-outline">
                                        <div className="card-body box-profile">
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle" src="./dist/img/admintuan.jpg" alt="User profile picture" />
                                            </div>
                                            <h3 className="profile-username text-center">User Tuan</h3>
                                            <p className="text-muted text-center">Software Engineer</p>
                                            <ul className="list-group list-group-unbordered mb-3">
                                                <li className="list-group-item">
                                                    <b>Followers</b> <a className="float-right">1,322</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Following</b> <a className="float-right">543</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Friends</b> <a className="float-right">13,287</a>
                                                </li>
                                            </ul>
                                            <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}
                                    {/* About Me Box */}
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">About Me</h3>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                            <p className="text-muted">Lagi Binh Thuan</p>
                                            <hr />
                                            <strong><i className="fas fa-pencil-alt mr-1" /> Number Phone</strong>
                                            <p className="text-muted">
                                                <span className="tag tag-danger">0348010604</span>
                                            </p>
                                            
                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-9">
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Information</a></li>
                                            </ul>
                                        </div>{/* /.card-header */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="settings">
                                                    <form className="form-horizontal">

                                                    <div className="form-group row">
                                                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">UserName</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="inputName" placeholder="UserName" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Password</label>
                                                            <div className="col-sm-10">
                                                                <input type="password" className="form-control" id="inputName2" placeholder="Password" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputExperience" className="col-sm-2 col-form-label">NumberPhone</label>
                                                            <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="inputName2" placeholder="NumberPhone" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Location</label>
                                                            <div className="col-sm-10">
                                                            <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="offset-sm-2 col-sm-10">
                                                                <button type="submit" className="btn btn-success">Submit</button>
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

export default DetailUser;
