import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './screen/login'
import Register from './screen/register';
import Forgot from './screen/forgotPassword';
import ResetPassword from './screen/resetPassword';
import Note from './screen/note';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  }
})


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router >
          <div className="App">
            <Route path='/register' component={Register} />
            <Route path='/' exact strict component={Login} />
            <Route path='/forgot' component={Forgot} />
            {/* <Route path='/note' component={Note} /> */}
            <Route path='/reset' component={ResetPassword} />
            <Route path='/notes' component={Note} />
          </div>
        </Router>
      </MuiThemeProvider>)
  }
}
export default App;
