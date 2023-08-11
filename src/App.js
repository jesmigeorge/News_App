import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
//rcc - command to import
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
   state = {
    progress: 0
   }

   setProgress = (progress) => {
    this.setState({progress: progress});
   }

   apiKey = process.env.REACT_APP_NEWS_API;

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            {/* <Route exact path="/" element={<Home/>} /> */}
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="general"/>} />
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="business"/>} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="sports" />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="health" />} />
            <Route exact path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="general" />} />
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="science" />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="technology" />} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={5} country="in" category="entertainment" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}



