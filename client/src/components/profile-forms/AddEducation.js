import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile';


const AddEducation = ({ addEducation, history }) => {
    // Initial form fields state will be empty form data for the form fields
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    // Initial toDate form field will be 'not disabled'
    const [toDateDisabled, toggleDisabled] = useState(false);

    // Destructure form fields data
    const {
        school,
        degree,
        fieldofstudy,
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
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
       Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school or bootcamp that you have attended in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* School / Bootcamp" name="school" required value={school} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Degree / Certificate" name="degree" required value={degree} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
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
          }} />{' '}Current School</p>
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
            placeholder="Program Description"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))
