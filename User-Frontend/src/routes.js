import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './component/Home/Home';
import Login_Register from './component/Login_Register/Login_Register';

class RouterWeb extends React.Component {
    render(){
        return(
            <Switch>

                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login_Register}/>
            </Switch>
        )
    }
}

export default RouterWeb;