import React from 'react'
import { Route, Redirect } from 'react-router-dom'; 
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// Accept component props and any other parameters as arguments
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    // Use Route with 'render' prop to check if user is not authenticated and not loading
    // If true, then redirect to login
    // Else, component will load
    <Route { ...rest } render={props => !isAuthenticated && !loading ? (<Redirect to='/login'/>) : (<Component { ...props }/>) }/>
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
