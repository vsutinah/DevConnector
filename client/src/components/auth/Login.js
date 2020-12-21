import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// Pass in login action (from props) & isAuthenticated state object as arguments
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        // Initial states 
        email: '',
        password: '',
    }); 

    const { email, password } = formData;
    // Event handlers
    // onChange event handler that dynamically changes form data with our input?
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    // onSubmit event handler that prevents event bubbling?
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password); // Call login action for user login
    }

    // Redirect if logged in
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (<Fragment>
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} // E.g of a prop 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </Fragment>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

// Use mapStateToProps to get our auth state to our component
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


// Connect component to our login action
export default connect(
  mapStateToProps, 
  { login })
  (Login);

