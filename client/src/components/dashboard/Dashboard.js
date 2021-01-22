// main dashboard file
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }}) => {
    // when  the page loads, retrieve current user profile
    useEffect(() => {
        getCurrentProfile();
    }, []);
    
    // check if loading, since if no profile is found for user will run Spinner for ever
    return (loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name}
        </p>
        {profile !== null ? <Fragment>has a profile</Fragment> : 
            <Fragment>
                <p>You have yet to add anything to your profile, add information to display here</p>
                <Link to="/create-profile" className="btn btn-primary my-1">Setup Profile</Link>
            </Fragment>}
    </Fragment>);
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);