import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Form from '../form';
import '../form.css';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [redirect, setRedirect] = useState(localStorage.getItem('userTokenTime') ? true : false);

  const onSubmitHandler = () => {
    if (!(email === '' || password === '')
      && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
      axios.post('http://localhost:3333/api/signIn', {
        email: email,
        password: password
      }).then(res => {
        setToken(res.data.token);
        const data = {
          token: res.data.token,
          time: new Date().getTime()
        }
        localStorage.setItem('userTokenTime', JSON.stringify(data));
        setRedirect(true);
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details');
    }
  }

  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  if (redirect) return <Redirect to="/" />;
  return (
    <Form onSubmit={onSubmitHandler}>
      <h3 className="text-center text-info">Login</h3>
      <div className="form-group">
        <label htmlFor="email" className="text-info">Email:</label><br />
        <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          placeholder="example@domain.com"
          onChange={emailInputChangeHandler}
          required />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-info">Password:</label><br />
        <input
          id="password"
          className="form-control"
          type="password"
          name="password"
          placeholder="********"
          onChange={passwordInputChangeHandler}
          required />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <button onClick={onSubmitHandler} className="btn btn-info btn-md" type="button">Submit</button>
        <Link to="/signUp" className="text-info">Sign Up here</Link>
      </div>
    </Form>
  );
}

export default SignIn;
