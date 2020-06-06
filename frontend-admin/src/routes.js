import React from 'react';		
import {Route,Switch} from 'react-router-dom';	
import Menu from './components/Menu/Menu';
import AddUser from './components/ManageUser/AddUser/AddUser';
import UpdateUser from './components/ManageUser/UpdateUser/UpdateUser';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Contact from './components/Contact/Contact';
import ReadMail from './components/MailBox/ReadMail/ReadMail';
import ComposeMail from './components/MailBox/Compose/Compose';
import InboxMail from './components/MailBox/MailBox/Inbox';
import StatisticalRevenue from './components/StatisticalRevenue/StatisticalRevenue';
import AllUsers from './components/ManageUser/AllUsers/AllUsers';
import AllFilms from './components/ManageFilm/AllFilms/AllFilms';
import AddFilm from './components/ManageFilm/AddFilm/AddFilm';
import UpdateFilm from './components/ManageFilm/UpdateFilm/UpdateFilm';
import AllFilmsShedule from './components/ManageSchedule/AllFilms/AllFilms';
import DetailShedule from './components/ManageSchedule/DetailShedule/DetailShedule';
import AddShedule from './components/ManageSchedule/AddShedule/AddShedule';
import AllTickets from './components/ManageTicket/AllTickets/AllTicket'
import DetailTicket from './components/ManageTicket/DetailTicket/DetailTicket'
import TicketHistory from './components/ManageTicket/LichSuVe/LichSuVe'
import DetailTicketHistory from './components/ManageTicket/DetailTicketHistory/DetailTicketHistory' 
class RouterWeb extends React.Component {	

    render() {	
        return (	
            <Switch>	
                <Route exact path='/' component={Login}/>
                <Route exact path='/adduser' component={AddUser}/>
                <Route exact path='/updateuser' component={UpdateUser}/>
                <Route exact path='/menu' component={Menu}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/contact' component={Contact}/>
                <Route exact path='/composemail' component={ComposeMail}/>
                <Route exact path='/readmail' component={ReadMail}/>
                <Route exact path='/inboxmail' component={InboxMail}/>
                <Route exact path='/statisticalRevenue' component={StatisticalRevenue}/>
                <Route exact path='/allusers' component={AllUsers}/>
                {/* <Route exact path='/detailuser' component={DetailUser}/> */}
                <Route exact path='/allfilms' component={AllFilms}/>
                <Route exact path='/addfilm' component={AddFilm}/>
                <Route exact path='/updatefilm' component={UpdateFilm}/>
                <Route exact path='/allfilmsshedule' component={AllFilmsShedule}/>
                <Route exact path='/detailshedule' component={DetailShedule}/>
                <Route exact path='/addshedule' component={AddShedule}/>

                <Route exact path='/alltickets' component={AllTickets}/>
                <Route exact path='/ticketshistory' component={TicketHistory}/>
                <Route exact path='/detailticket' component={DetailTicket}/>
                <Route exact path='/detailtickethistory' component={DetailTicketHistory}/>
                
            </Switch>	

        );	
    }	
}	
export default RouterWeb;