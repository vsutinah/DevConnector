import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';

// Destructure the profile state and loading prop from props.profile
const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])
    // If profile is null and page is still loading, render Spinner
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome, { user && user.name }
        </p>
        {/* Check if profile isn't null; and render Fragment containing Profile */}
        { profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={ profile.experience }/>
                <Education education={ profile.education } />
            
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus" /> Delete My Account
                    </button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not yet setup a profile.</p>
                <p>Please add some info:</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment>
        )}
    </Fragment>;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(
    mapStateToProps,
    { getCurrentProfile, deleteAccount }
)(Dashboard);