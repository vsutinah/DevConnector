import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// Pass props.setAlert into Register component, so we can send the setAlert action
const Register = ({ setAlert, register }) => {
  // formData = our states, setFormData = function to update states
    const [formData, setFormData] = useState({
        // Initial states
        name: '', 
        email: '',
        password: '',
        password2: ''
    }); 

    // Destrucutre states from formData
    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    // onSubmit function for button when submitting form data
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            // Sends action to set an alert to the store
            setAlert('Passwords do not match', 'danger', 3000);
        } else {
            register({ name, email, password });
            setAlert('Registration successful!', 'success', 3000)
        }
    }

    return (<Fragment>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" 
          placeholder="Name" 
          name="name" 
          value={name} // Props referring to 'name' state data above 
          onChange={e => onChange(e)} // onChange props to maintain field state when typing
           />
        </div>
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email} // Props referring to 'email' state data above 
          onChange={e => onChange(e)} // onChange props to maintain field state when typing
           />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            
            value={password} // Props referring to 'password' state data above 
            onChange={e => onChange(e)} // onChange props to maintain field state when typing
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            
            value={password2} // Props referring 'password2' state data above
            onChange={e => onChange(e)} // onChange props to maintain field state when typing
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login.html">Sign In</Link>
      </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

export default connect(
  null, 
  { setAlert, register })
  (Register);
