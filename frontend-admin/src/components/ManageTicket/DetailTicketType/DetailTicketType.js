import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class DetailTicketType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Film: null
    }
    this.onChangeDaoDien = this.onChangeDaoDien.bind(this)
  }

  UNSAFE_componentWillMount() {
    var LoaiVe = {LoaiVe: sessionStorage.getItem('loaive')};
    axios.post("http://htvcinemas.live:8000/giave/find", LoaiVe)
      .then((res) => {
        this.setStateFilms(res.data.loaive);
      });
  }

  setStateFilms = (Film) => {
    this.setState({ Film });
  }

  onChangeDaoDien = (e) => {
    if(Number(e.target.value.substring(0, e.target.value.length - 5))) {
      var film = this.state.Film;
      film[0]["GiaVe"] = e.target.value.substring(0, e.target.value.length - 5);
      this.setState({
        Film: film
      });
    } else {
      return window.alert("Nhập số cho mục giá vé!!!")
    }
    
  }

  onSubmit = (e) => {
    if (window.confirm("Do you really want to update?")) {
      e.preventDefault();
      let count = 0;
      this.state.Film.map( async (item) => {
        const film = item;
        await axios.put('http://htvcinemas.live:8000/giave/updateGiaVe', film)
        .then((res) => {
          if (!res.data.error) {
            count++;
          } else {
            return window.alert(res.data.error)
          }
        });
        if(count === this.state.Film.length) {
          window.alert("update ticket price success!");
          return window.location.reload();
        }
      })
    }
  }

  handleOnclickDelete = (film) => {
    if (window.confirm("Do you really want to delete?")) {
      var film = film;
      axios.put("http://htvcinemas.live:8000/giave/deleteTicketType", film)
        .then((res) => {
          if (!res.data.error) {
            window.alert("delete successfull !!!")
            window.location = '/alltickettype';
          } else {
            return window.alert(res.data.error)
          }
        });
    }
    
  }

  render() {
    console.log(this.state.Film)
    if(this.state.Film) {
      return (
        <div>
          <Menu />
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Detail Ticket Type</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                      <li className="breadcrumb-item active">DetailTicketType</li>
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
                            <a className="nav-link" href="" data-toggle="tab">Thông tin vé</a>
                          </li>
                        </ul>
                      </div>{/* /.card-header */}
                      {this.state.Film.map((item, index) => 
                        <div className="card-body">
                          <div className="tab-content">
                            <div className="active tab-pane" id="settings">
                              <button className="btn btn-danger float-right" onClick={this.handleOnclickDelete.bind(this, item)}>
                                <i className="fas fa-trash float-right"></i>Delete</button>
                              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Loại vé</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Loại vé" defaultValue={item["LoaiVe"]} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputName" className="col-sm-2 col-form-label">Giá vé</label>
                                  <div className="col-sm-10">
                                      <input type="text" className="form-control" id="inputName" placeholder="Giá vé" defaultValue={item.GiaVe + ' đồng'} onChange={this.onChangeDaoDien}/>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <a href="/alltickettype" className="btn btn-secondary">Cancel</a>
                                    <button type="submit" className="btn btn-success float-right">Update</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
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
      <div>
          <Menu />
          <div className="content-wrapper">
              <section className="content-header">
                  <div className="container-fluid">
                      <div className="row mb-2">
                          <div className="col-sm-6">
                              <h1>Detail Ticket Type</h1>
                          </div>
                          <div className="col-sm-6">
                              <ol className="breadcrumb float-sm-right">
                                  <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                  <li className="breadcrumb-item active">DetailTicketType</li>
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
                                              <a className="nav-link" href="" data-toggle="tab">Thông tin vé</a>
                                          </li>
                                      </ul>
                                  </div>{/* /.card-header */}
                                      <div className="card-body">
                                          <div className="tab-content">
                                              <div className="active tab-pane" id="settings">
                                                  <form className="form-horizontal">
                                                      <div className="form-group row">
                                                          <div className="col-sm-10">
                                                              <input type="text" className="form-control" id="inputFilmName" placeholder="Tên phim" defaultValue="Chưa có lịch chiếu" disabled/>
                                                          </div>
                                                      </div>
                                                      <div className="row">
                                                          <div className="col-12">
                                                              <a href="/allfilmsshedule" className="btn btn-secondary">Cancel</a>
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

export default DetailTicketType;
