import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// Alert Component which 
const Alert = ({ alerts }) => 
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            { alert.msg }
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    // Map our alert state to a prop called 'alerts'
    alerts: state.alert
});
// See docs for more deets on mapStateToProps
export default connect(mapStateToProps)(Alert);
