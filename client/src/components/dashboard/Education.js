import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile' 

// education prop passed in from parent component 'Dashboard'
const Education = ({ education, deleteEducation }) => {
    
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.school}</td>
            <td>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now' }
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>    
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(
    null,
    { deleteEducation }
)(Education)
