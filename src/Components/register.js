import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { registerUser } from "../Services/BackendService";


export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      passwordError: null
    }
  }

  loginUser = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    if (password === this.state.repassword) {
      registerUser({ email, password }).then(token => {
        if (!token.error) {
          this.props.loginUser(token.token);
        } else {
          const emailError = token.error;
          this.setState({ emailError });
        }
      });
    } else {
      const passwordError = "Passwords don't match";
      this.setState({ passwordError })
    }
  }

  onEmailChange = (e, email) => {
    this.setState({ email });
  }

  onPasswordChange = (e, password) => {
    this.setState({ password });
  }

  onRePasswordChange = (e, repassword) => {
    this.setState({ repassword });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ position: "absolute", height: "100vh", width: "100%", backgroundColor: "white"}}>
          <div style={{ position: "absolute", width: 256, marginLeft: "50%", marginTop: (window.innerHeight - 64)  / 2, transform: "translate(-50%, -50%)" }}>
            <div style={{ fontSize: "24px", textAlign: "center" }}>Sign Up for Movie App</div>
            <form>
              <TextField autoComplete="email" hintText="Email" onChange={this.onEmailChange} style={{ display: "block", margin: "20px 0"}} errorText={this.state.emailError} />
              <TextField autoComplete="off" hintText="Password" type="password" onChange={this.onPasswordChange} style={{ display: "block", margin: "20px 0"}} errorText={this.state.passwordError} />
              <TextField autoComplete="off" hintText="Re-type Password" type="password" onChange={this.onRePasswordChange} style={{ display: "block", margin: "20px 0"}} />
              <RaisedButton label="Register" primary fullWidth onClick={this.loginUser} />
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
