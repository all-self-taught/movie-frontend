import React, { Component } from 'react';
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import HeaderContainer from '../Containers/HeaderContainer';
import Public from './public';
import LoginContainer from '../Containers/LoginContainer';
import RegisterContainer from '../Containers/RegisterContainer';
import Favorites from './favorites';
import Search from './search';


const AuthRoute = ({ component: AuthComponent, ...rest }) => {
  const { token } = rest
  if (!token) {
    return <AuthComponent {...rest} />
  }
  return <Redirect to="/search" />
}

const PrivateRoute = ({ component: PrivateComponent, ...rest }) => {
  const { token } = rest
  if (token) {
    return <PrivateComponent {...rest} />
  }
  return <Redirect to="/login" />
};


export default class App extends Component {

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.loginUser(token);
    }
    else this.props.loginUser("");
  }


  render() {
    if (this.props.token === null) return null;

    return (
      <div>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={Public} />
          <AuthRoute path="/login" component={LoginContainer} token={this.props.token} />
          <AuthRoute path="/register" component={RegisterContainer} token={this.props.token} />
          <PrivateRoute path="/favorites" component={Favorites} token={this.props.token} />
          <PrivateRoute path="/search" component={Search} token={this.props.token} />
        </Switch>
      </div>
    );
  }
}
