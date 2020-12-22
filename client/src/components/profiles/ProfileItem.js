import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// Destructure profile attributes
const ProfileItem = ({ profile: { 
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
    } 
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">
                    {location && <span>{location}</span>}
                </p>
                <Link to={`profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
                { skills.slice(0, 4).forEach((skill, index) => {
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check'></i> {skill}
                    </li>
                })
            }
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
