import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ username, isAuth, logout }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark pb-header">
      <Link className="navbar-brand" to="/">Personal Budget</Link>
      {
        isAuth &&
        <span className="navbar-text">
          Welcome {username}
        </span>
      }
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {
            isAuth &&
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/operations">Manage Operations</Link>
              </li>
              <li>
                <button className="btn btn-outline-primary" type="button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          }
          {
            !isAuth &&
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ auth: { username, isAuth } }) => {
  return {
    username,
    isAuth
  }
}

export default connect(mapStateToProps)(Header);