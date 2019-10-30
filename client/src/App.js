import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import {
  registerUser,
  verifyUser,
  allUsers,
  loginUser,
  getActiveUser
} from './services/api-helper'


import Auth from './views/Auth'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'auth',
      loginFormData: {
        email: '',
        password: '',
      },
      registerFormData: {
        email: '',
        password: '',
      },
      users: [],
      loginError: false,
    }
  }



  // SB - Handle Register Form Change
  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }



  // SB - Registration Submit

  handleRegisterSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const user = await registerUser(this.state.registerFormData);
      console.log(user);
      this.setState({
        registerForm: {
          email: '',
          password: ''
        },
        loginError: false,
        currentUser: user,
        currentView: 'dashboard'
      });
      this.props.history.push('/dashboard')
    } catch (e) {
      console.log(e)
      this.setState({
        loginError: true,
      });
    }
  }


  //SB - Handle Login Change

  handleLoginFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value,
      },
    }));
  }


  // SB - Handle Login Submit


  handleLoginSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const user = await loginUser(this.state.loginFormData);
      console.log(user);
      this.setState({
        loginFormData: {
          email: '',
          password: '',
        },
        loginError: false,
        currentUser: user,
        currentView: 'dashboard'
      });
      this.props.history.push('/dashboard')
    } catch (e) {
      console.log(e)
      this.setState({
        loginError: true,
      });
    }
  }


  async componentDidMount() {
    const resp = await axios.get('http://localhost:3000/api/users');
    const users = resp.data;
    this.setState({
      users: users,
    });
  };

  render() {
    return (
      <>
        <div>
          {/* Public Routes */}
          <Switch>
            <Route path="/auth" render={() => (
              <Auth
                currentView={this.state.currentView}
                registerForm={this.state.registerFormData}
                handleRegisterSubmit={this.handleRegisterSubmit}
                handleRegisterFormChange={this.handleRegisterFormChange}

                loginForm={this.state.loginFormData}
                loginError={this.state.loginError}
                handleLoginSubmit={this.handleLoginSubmit}
                handleLoginFormChange={this.handleLoginFormChange}
              />

            )} />
          </Switch>
        </div>
      </>
    );
  }
}
export default withRouter(App);