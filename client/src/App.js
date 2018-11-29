/**
 * testing branch
 */
import React, {Component}from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './screen/login'
import Register from './screen/register';
import Forgot from './screen/forgotPassword';
// import Note from './screen/note';
import ResetPassword from './screen/resetPassword';
import Note from './screen/note';
class App extends Component{
  render(){
    return(
    <Router>
      <div className="App">
      <Route path='/register' component={Register} />
      <Route path='/' exact strict component={Login} />
      <Route path='/forgot' component={Forgot} />
      {/* <Route path='/note' component={Note} /> */}
      <Route path='/reset' component={ResetPassword} />
      <Route path='/notes' component={Note} />
      </div>
    </Router>)
  }
}
export default App;
