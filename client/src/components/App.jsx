import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';
import AddCountry from './pages/AddCountry';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CountryDetail from './pages/CountryDetail';

import api from '../api';
import logo from '../logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/add-country">Add country</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink>
        </header>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/countries" exact component={Countries} />
          <Route exact path="/countries/:countryId" exact component={CountryDetail} />
          <Route exact path="/add-country" exact component={AddCountry} />
          <Route exact path="/signup" exact component={Signup} />
          <Route exact path="/login" exact component={Login} />
          <Route exact path="/secret" exact component={Secret} />
          <Route exact render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
