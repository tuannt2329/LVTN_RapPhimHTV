import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import Menu from '../Menu/Menu';
class StatisticalRevenue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chart : null
        };
    }

    componentDidMount() {

    }
    UNSAFE_componentWillMount() {
        axios.get("http://htvcinemas.live:3001/film/thuchi")
            .then((res) => {
                if(res.data.length !== 0) {
                    this.setStateFilms(res.data);
                }
            });
    }

    setStateFilms = (data) => {
        var tenfilm = [];
        var dataThu = [];
        var dataChi = [];
        data.map(item => {
            tenfilm.push(item["TenFilm"]);
            dataThu.push(item["TongThu"]);
            dataChi.push(item["TongChi"]);
        })
        dataChi.push(0);
        dataThu.push(0);
        var chart = {
            labels: tenfilm,
            datasets: [
                {
                    label               : 'Tổng chi',
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : dataChi
                },
                {
                    label               : 'Tổng thu',
                    backgroundColor     : 'rgba(210, 214, 222, 1)',
                    borderColor         : 'rgba(210, 214, 222, 1)',
                    pointRadius         : false,
                    pointColor          : 'rgba(210, 214, 222, 1)',
                    pointStrokeColor    : '#c1c7d1',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data                : dataThu
                }
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    stacked: true,
                  }],
                  yAxes: [{
                    stacked: true
                  }]
                }
            }
        }
        this.setState({chart: chart});
    }

    
    render() {
        return (
            <div>
                <Menu />
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Tổng thu chi từng phim</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/allfilms">Home</a></li>
                                        <li className="breadcrumb-item active">Chart </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-7 mx-auto d-block">
                                    {/* STACKED BAR CHART */}
                                    <div className="card card-success">
                                        <div className="card-header">
                                            <h3 className="card-title">Stacked Bar Chart </h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                                </button>
                                                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="chart">
                                            <Bar
                                                data={this.state.chart}
                                                options={{
                                                    title:{
                                                    display:true,
                                                    text:'Tổng thu chi từng phim',
                                                    fontSize:20
                                                    },
                                                    legend:{
                                                    display:true,
                                                    position:'right'
                                                    }
                                                }}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
            </div>
        );
    }

}

export default StatisticalRevenue;
