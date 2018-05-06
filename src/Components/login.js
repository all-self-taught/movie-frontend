import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { loginUser } from "../Services/BackendService";


export default class Login extends Component {

  constructor() {
    super();
    this.state = {};
  }

  loginUser = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    loginUser({ email, password }).then(token => {
      if (!token.error) {
        this.props.loginUser(token.token);
      } else {
        const error = token.error;
        this.setState({ error });
      }
    });
  }

  onEmailChange = (e, email) => {
    this.setState({ email });
  }

  onPasswordChange = (e, password) => {
    this.setState({ password });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ position: "absolute", height: "100vh", width: "100%", backgroundColor: "white"}}>
          <div style={{ position: "absolute", width: 256, marginLeft: "50%", marginTop: (window.innerHeight - 64)  / 2, transform: "translate(-50%, -50%)" }}>
            <div style={{ fontSize: "24px", textAlign: "center" }}>Login to Movie App</div>
            <form>
              <TextField autoComplete="off" hintText="Email" onChange={this.onEmailChange} style={{ display: "block", margin: "20px 0"}} />
              <TextField autoComplete="off" hintText="Password" type="password" onChange={this.onPasswordChange} style={{ display: "block", margin: "20px 0"}} />
              <RaisedButton label="Login" primary fullWidth onClick={this.loginUser} />
            </form>
            <div style={{ display: this.state.error ? "block" : "none", color: "red"}}>{this.state.error}</div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
