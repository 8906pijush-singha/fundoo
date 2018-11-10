import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './screen/login'
import Register from './screen/register';
import Forgot from './screen/forgotPassword';
class App extends Component{
  render(){
    return(
    <Router>
      <div className="App">
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/forgot' component={Forgot} />
      </div>
    </Router>)
  }
}
export default App;
