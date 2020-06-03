import React from 'react';
import "./TicketHistory.css";
import axios from "axios";
var images = [];
class TicketHistory extends React.Component {
    renderVe = () => {
        // if (aa !== 0) {
        return (
            <div className="ticket-wrap">
                <div className="ticket-center" >
                    <div className="row">
                        <div className="col-md-4" >
                            <img src="./htv/website/images/IStillBelieve.jpg" alt="Phim blood shot" style={{ width: 400, height: 315 }}></img>

                        </div>
                        <div className="col-md-8" >
                            <div className="ticket-history-info" >
                                <h2>THÔNG TIN VÉ</h2>
                                <ul className="ticket-wrap-infohistory">
                                    <div className="col-title">Phim:</div><div className="col-value">ss</div> <br />
                                    <div className="col-title">Ngày chiếu:</div><div className="col-value">aaa</div><br />
                                    <div className="col-title">Thời gian chiếu:</div><div className="col-value">aaa</div><br />
                                    <div className="col-title">Phòng chiếu:</div><div className="col-value">a</div><br />
                                    <div className="col-title">Chỗ ngồi:</div><div className="col-value">aaa</div><br />
                                    <div className="col-title">Thời gian đặt vé:</div><div className="col-value">aaaa</div><br />
                                    <div className="col-title">Thời gian thời gian xác nhận:</div><div className="col-value">ss</div><br />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tour">
                    <div className="ticket-btn">
                        ------------------------------------------------------
                            </div>
                </div>
            </div>
        )

        // } else {
        //     return (
        //         <div className="container">
        //             <center> <h5>Bạn chưa mua vé nào!!!</h5></center>
        //             <div className="ticket-details" style={{ opacity: 1 }}></div>
        //         </div>
        //     )
        // }
    }

    render() {
        const hStyle = { color: 'blue' };
        return (
            <div className="container">
                <center><h2 className="font-header-ticket-history"><br />LỊCH SỬ ĐẶT VÉ</h2></center>
                {this.renderVe()}
            </div>
        );
    }
}
export default TicketHistory;
