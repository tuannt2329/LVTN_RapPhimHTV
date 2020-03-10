import React from 'react';


import { BrowserRouter as Router } from 'react-router-dom';
import RouterWeb from './routes';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <RouterWeb />
        </div>
      </Router>
    );
  }

}

export default App;
