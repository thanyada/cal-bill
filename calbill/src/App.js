import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header.js"
import CalPromotion from "./CalPromotion.js"
import Footer from "./Footer.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <CalPromotion/>
        <Footer/>
      </div>
    );
  }
}

export default App;
