import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';


const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    // Run getProfileById only once (when page is loading)
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {/* Show spinner when page is loading; else, show Profile info */}
            { profile === null || loading ? <Spinner/> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                {/* Show Edit Profile if user is logged in, loading is done, and logged in user ID == profile's user ID */}
                { auth.isAuthenticated && 
                auth.loading === false && 
                auth.user._id === profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark'>
                        Edit Profile
                    </Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getProfileById }
)(Profile)
