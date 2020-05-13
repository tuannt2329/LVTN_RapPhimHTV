import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './component/Home/Home';
import Login from './component/Login_Register/Login';
import Register from './component/Login_Register/Register';
import DetailFilm from './component/DetailFilm/DetailFilm';
import Seat from './component/Seat/Seat';
class RouterWeb extends React.Component {
    render(){
        return(
            <Switch>

                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/detailfilm' component={DetailFilm}/>
                <Route exact path='/seat' component={Seat}/>
            </Switch>
        )
    }
}

export default RouterWeb;