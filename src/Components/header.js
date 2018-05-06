import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from "material-ui/FlatButton";

const NoAuthButtons = props => {
  return (
    <span>
      <FlatButton label="Log in" style={{ color: 'rgb(255, 255, 255)'}} containerElement={<Link to="/login" />}/>
      <FlatButton label="Register" style={{ color: 'rgb(255, 255, 255)'}} containerElement={<Link to="/register" />}/>
    </span>
  )
}

const AuthButtons = props => {
  return (
    <span>
      <FlatButton label="Favorites" style={{ color: 'rgb(255, 255, 255)'}} containerElement={<Link to="/favorites" />} />
      <FlatButton label="Search" style={{ color: 'rgb(255, 255, 255)'}} containerElement={<Link to="/search" />} />
      <FlatButton label="Log out" onClick={props.logout} style={{ color: 'rgb(255, 255, 255)'}} containerElement={<Link to="#" />} />
    </span>
  )
}


export default class Header extends Component {

  logout = () => {
    this.props.loginUser("");
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="Movie App"
          onTitleClick={() => {this.props.history.push("/")}}
          titleStyle={{ cursor: "pointer" }}
          showMenuIconButton={false}
          iconElementRight={
            this.props.token
              ? <AuthButtons logout={this.logout} />
              : <NoAuthButtons />
          }
          iconStyleRight={{
            marginTop: 16
          }}
        />
      </MuiThemeProvider>
    )
  }
}
