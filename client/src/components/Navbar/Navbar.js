import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userTokenTime'));
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info nav-container">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bolder', fontStyle: 'italic' }}>Streamify</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {
              loggedIn
                ?
                <>
                  <NavLink className="nav-item nav-link" to="/" exact style={{ fontSize: 20, fontWeight: 400 }}>Home</NavLink>
                  <NavLink className="nav-item nav-link" to="/upload" style={{ fontSize: 20, fontWeight: 400 }}>Upload</NavLink>
                  <NavLink className="nav-item nav-link" to="/signOut" style={{ fontSize: 20, fontWeight: 400 }}>Sign Out</NavLink>
                </>
                :
                <>
                  <NavLink className="nav-item nav-link" to="/signIn" style={{ fontSize: 20, fontWeight: 400 }}>Sign In</NavLink>
                  <NavLink className="nav-item nav-link" to="/signUp" style={{ fontSize: 20, fontWeight: 400 }}>Sign Up</NavLink>
                </>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
