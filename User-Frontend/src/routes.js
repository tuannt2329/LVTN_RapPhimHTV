import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './component/Home/Home';
import Login from './component/User/Login';
import Register from './component/User/Register';
import DetailFilm from './component/DetailFilm/DetailFilm';
import Seat from './component/Seat/Seat';
import UpdateInfoUser from './component/User/UpdateInfoUser'
import TicketHistory from './component/TicketHistory/TicketHistory';
import TicketDaDat from './component/TicketDaDat/TicketDaDat'
import TabMovie from './component/Home/TabMovie/TabMovie';
import successPayment from './component/successPayment/successPayment'
class RouterWeb extends React.Component {
    render(){
        return(
            <Switch>

                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/detailfilm' component={DetailFilm}/>
                <Route exact path='/seat' component={Seat}/>
                <Route exact path='/updateinfouser' component={UpdateInfoUser}/>
                <Route exact path='/tickethistory' component={TicketHistory}/>
                <Route exact path='/ticketdadat' component={TicketDaDat}/>
                <Route exact path='/tabmovie' component={TabMovie}/>

                <Route exact path='/successpayment' component={successPayment}/>
            </Switch>
        )
    }
}

export default RouterWeb;