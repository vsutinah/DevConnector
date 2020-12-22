import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile';


const AddExperience = ({ addExperience, history }) => {
    // Initial form fields state will be empty form data for the form fields
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    // Initial toDate form field will be 'not disabled'
    const [toDateDisabled, toggleDisabled] = useState(false);

    // Destructure form fields data
    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    // onChange event handler that dynamically changes form field data with our input?
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
 
    // onSubmit
    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
            // set formData's current value to be its opposite value, then toggle disabled value
            setFormData({ ...formData, current: !current })
            toggleDisabled(!toDateDisabled);
          }} />{' '}Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          {/* Set 'to' form field to be disabled if current is checked */}
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={
              toDateDisabled ? 'disabled' : ''
          }/>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience))
