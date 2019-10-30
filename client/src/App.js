import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import {
  // User Data
  registerUser,
  allUsers,
  loginUser,
  getActiveUser,

  // Site & Page
  getUserSites,
  newUserSite,
  addPage,
  updatePage,
  deleteSite,
  getSite
} from './services/api-helper'


import Auth from './views/Auth'
import Dashboard from './views/Dashboard';
import Create from './views/Create'
import Edit from './views/Edit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'login',
      currentUser: [],
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
      sites: [],
      snackFormData: {
        name: "",
        category: ""
      },
      pages: [],
      pageFormData: {
        content: "",
      },
      currentSiteId: [],
    }
  }


  // ================= //
  // ***** AUTH  ***** //
  // ================= //



  async componentDidMount() {
    const users = await getActiveUser();
    this.getUserSites();
    const allUserSites = await getUserSites();
    this.setState({
      currentUser: users,
    });
    console.log(allUserSites);
  };


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





  // ================= //
  // ***** SITES ***** //
  // ================= //


  // GET ALL SITES
  getUserSites = async () => {
    const sites = await getUserSites();
    this.setState({
      sites
    })
  }


  // NEW SITE
  newSite = async (e) => {
    e.preventDefault();

    const userID = this.state.currentUser.id;
    const site = await newUserSite(userID, this.state.snackFormData);
    console.log(this.state.currentUser);
    this.setState(prevState => ({
      sites: [...prevState.sites, site],
      currentSiteId: site.id,
    }))
    this.props.history.push("/edit/form")
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      snackFormData: {
        ...prevState.snackFormData,
        [name]: value
      }
    }))
  }

  render() {
    return (
      <>
        <div>
          {/* Public Routes */}
          <Switch>
            {/* <Route path="/" component={Home} /> */}
            <Route path="/dashboard" component={Dashboard} />
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

            <Route exact path="/create" render={() => (
              <Create
                snackFormData={this.state.snackFormData}
                handleFormChange={this.handleFormChange}
                newSite={this.newSite}
                handleCreate={this.handleCreate}
              />
            )} />

            <Route path="/edit" render={(props) => (
              <Edit
                {...props}
                site={this.state.site}
                editPage={this.state.page}
                postPage={this.postPage}
              />
            )} />
          </Switch>
        </div>
      </>
    );
  }
}
export default withRouter(App);