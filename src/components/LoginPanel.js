import React from 'react';
import { firebaseApp } from '../fbase';

class LoginPanel extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  authenticate = (event) => {
    event.preventDefault();
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.changeLoggedIn(true);
        localStorage.setItem("loggedIn", true) //tutaj zapisujemy uzytkownika zalogowanego, zeby przy kazdym odswiezeniu nie musial sie na nowo logowac
      })
      .catch(() => {
        console.log('Unable to authenticate');
      })
  }

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.authenticate}>
          <input type="text" placeholder="email" id="email_bs" name="email" className="form-control"
            onChange={this.handleLoginChange} value={this.state.email} />
          <input type="password" id="password_bs" name="password" className="form-control"
            onChange={this.handleLoginChange} value={this.state.password} />
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
      </div>
    )
  }
}

export default LoginPanel;