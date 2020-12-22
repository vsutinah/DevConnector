import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const ProfileExperience = ({ experience: {
    company, 
    title, 
    location, 
    current, 
    to, 
    from, 
    description
} }) => {
    return (
        <div>
            <h3 className="text-dark">{ company }</h3>
            <p>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
