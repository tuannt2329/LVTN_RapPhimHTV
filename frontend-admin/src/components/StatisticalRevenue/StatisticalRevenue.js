import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import Menu from '../Menu/Menu';
class StatisticalRevenue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chart : null,
            tongthuPhim: 0,
            tongchi: 0
        };
    }

    componentDidMount() {

    }
    UNSAFE_componentWillMount() {
        var TenFilm = {TenFilm: sessionStorage.getItem('tenphim')};
        axios.post("http://htvcinemas.live:8000/ticket/find", TenFilm)
            .then((res) => {
                if(!res.data.error) {
                    axios.post("http://htvcinemas.live:8000/film/find", TenFilm)
                    .then((res1) => {
                        if(!res1.data.error) {
                            this.setState({tongchi: res1.data.film[0].TongChi})
                        }
                    })
                    this.setStateFilms(res.data.ticket);
                }
            });
    }

    dynamicsort = (property) => {
        return function (a, b){
            // a should come before b in the sorted order
            if(a[property] < b[property]){
                    return -1;
            // a should come after b in the sorted order
            }else if(a[property] > b[property]){
                    return 1;
            // a and b are the same
            }else{
                    return 0;
            }
        }
    }
      
    setStateFilms = (data) => {
        let list = []
        for (const lc in data) {
            var lichchieu = (data[lc]["ThoiGianChieu"]).split("T");
            var i = 0;
            for (const n in list) {
            if (lichchieu[0] !== list[n].NgayChieu) {
                i++;
            }
            }
            if (i === list.length) {
            list.push({ NgayChieu: lichchieu[0] });
            }
        }
        list.sort(this.dynamicsort("NgayChieu"))
        for (const nc in list) {
            let thu1ngaychieu = 0
            let sogheVIPbandctrong1ngay = 0
            let sogheCPbandctrong1ngay = 0
            for (const lc in data) {
                var lichchieu = (data[lc]["ThoiGianChieu"]).split("T")
                if (lichchieu[0] === list[nc].NgayChieu) {
                    thu1ngaychieu += data[lc]["GiaVe"]
                    for(const gheind in data[lc]["TenGhe"]) {
                        if(data[lc]["TenGhe"][gheind].substring(0, 1) !== "R") {
                            sogheVIPbandctrong1ngay++
                        } else {
                            sogheCPbandctrong1ngay++
                        }
                    }
                    
                }
            }
            list[nc]["TongThu1Ngay"] = thu1ngaychieu;
            list[nc]["sogheVIPbandctrong1ngay"] = sogheVIPbandctrong1ngay;
            list[nc]["sogheCPbandctrong1ngay"] = sogheCPbandctrong1ngay;
        }
        let NgayChieu = [];
        let TongThu1Ngay = [];
        let sogheVIPbandctrong1ngay = [];
        let sogheCPbandctrong1ngay = [];
        list.forEach(element => {
            NgayChieu.push(element.NgayChieu)
            TongThu1Ngay.push(element.TongThu1Ngay / 100000)
            sogheVIPbandctrong1ngay.push(element.sogheVIPbandctrong1ngay)
            sogheCPbandctrong1ngay.push(element.sogheCPbandctrong1ngay)
        });
        sogheVIPbandctrong1ngay.push(0)
        var chart = {
            labels: NgayChieu,
            datasets: [
                {
                    label               : 'Thu trong một ngày (*100,000 đồng)',
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : TongThu1Ngay
                },
                {
                    label               : 'ghế VIP đã bán',
                    backgroundColor     : 'rgba(200, 200, 200, 1)',
                    borderColor         : 'rgba(200, 200, 200, 1)',
                    pointRadius         : false,
                    pointColor          : 'rgba(200, 200, 200, 1)',
                    pointStrokeColor    : '#c1c7d1',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(200,200,200,1)',
                    data                : sogheVIPbandctrong1ngay
                },
                {
                    label               : 'ghế COUPLE đã bán',
                    backgroundColor     : 'rgba(5, 14, 22, 0.9)',
                    borderColor         : 'rgba(5, 14, 22, 0.9)',
                    pointRadius         : false,
                    pointColor          : 'rgba(5, 14, 22, 0.9)',
                    pointStrokeColor    : '#000308',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(5, 14, 22, 0.9)',
                    data                : sogheCPbandctrong1ngay
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
        let tongthuPhim = 0
        TongThu1Ngay.forEach(element => {
            tongthuPhim += element * 100000
        });
        this.setState({chart: chart, tongthuPhim: tongthuPhim});
    }

    
    render() {
        let loilo = this.state.tongthuPhim - this.state.tongchi
        console.log(loilo)
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
                                    <h1>Phim {sessionStorage.getItem('tenphim')}</h1>
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
                                <div className="col-md-9 mx-auto d-block">
                                    {/* STACKED BAR CHART */}
                                    <div className="card card-success">
                                        <div className="card-header">
                                            <h3 className="card-title">Biểu đồ </h3>
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
                                                    text:'Thống kê doanh thu và số lượng ghế đã đặt theo lịch chiếu',
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

                                    <div className="card card-success">
                                        <div className="card-header">
                                            <h3 className="card-title">Doanh thu</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                                </button>
                                                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="chart">
                                                <p>Tổng thu đến hiện tại: {Number(this.state.tongthuPhim).toLocaleString('en')} đồng</p>
                                                <p>Tổng chi: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                            {Number(this.state.tongchi).toLocaleString('en')} đồng</p>
                                                {
                                                    (loilo < 0) ? 
                                                    <p>Lỗ: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                           {Number(Math.abs(loilo)).toLocaleString('en')} đồng</p> 
                                                    :
                                                    <p>Lời: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    {Number(loilo).toLocaleString('en')} đồng</p>
                                                }
                                           
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
