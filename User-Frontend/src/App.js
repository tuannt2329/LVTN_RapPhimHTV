import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterWeb from './routes';
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <RouterWeb />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
