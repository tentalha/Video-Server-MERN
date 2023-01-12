import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Form from '../form';
import '../form.css';

function SignIn() {

  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [redirect, setRedirect] = useState(localStorage.getItem('userTokenTime') ? true : false)


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!(user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '')) {
        await axios.post('http://localhost:3333/api/signUp', user);
        setRedirect(true);
      }
      else {
        alert('Please enter valid details');;
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }


  if (redirect) return <Redirect to='/' />
  return (
    <Form onSubmit={onSubmitHandler}>
      <h3 className="text-center text-info">Register</h3>
      <div className="form-group">
        <label htmlFor="first-name" className="text-info">First Name:</label><br />
        <input
          id="first-name"
          className="form-control"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user?.firstName}
          onChange={handleOnChange}
          required />
      </div>
      <div className="form-group">
        <label htmlFor="last-name" className="text-info">Last Name:</label><br />
        <input
          id="last-name"
          className="form-control"
          type="text"
          name="lastName"
          value={user?.lastName}
          placeholder="Last Name"
          onChange={handleOnChange}
          required />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="text-info">Email:</label><br />
        <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          value={user?.email}
          placeholder="talha@cui.com"
          onChange={handleOnChange}
          required />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-info">Password:</label><br />
        <input
          id="password"
          className="form-control"
          type="password"
          name="password"
          value={user?.password}
          placeholder="********"
          onChange={handleOnChange}
          required />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
        <Link to="/signIn" className="text-info">Login here</Link>
      </div>
    </Form>
  );

}

export default SignIn;
