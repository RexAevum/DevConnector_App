// main dashboard file
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount}) => {
    // when  the page loads, retrieve current user profile
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    
    // check if loading, since if no profile is found for user will run Spinner for ever
    return (loading && profile === null ? (<Spinner />) : (<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <div className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name}{' '}
            <small>({user && user.email})</small>
        </div>
        {profile !== null ? (
            <Fragment>
                <DashboardActions></DashboardActions>
                <Experience experience={profile.experience}/> {/* Need to pass expereince prop from current user to be bale to display them */}
                <Education education={profile.education}/>

                <div className="my-2">
                    <Link className="btn btn my-1" to="/user"><i className="fas fa-user-edit text-primary"/> Edit User Info</Link>
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus"></i> Delete My Account
                    </button>
                </div>
            </Fragment>
        ) : ( 
            <p>{profile !== null ? <Fragment></Fragment> :                
                <Fragment>
                    <p>You have yet to add anything to your profile, add information to display here</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">Setup Profile</Link>
                    <Link className="btn btn my-1" to="/user"><i className="fas fa-user-edit"/> Edit User Info</Link>
                </Fragment>    
            }</p>
            
        )}
        <Link to="/feedback" className="btn btn-white my-1">Submit Feedback</Link>
    </Fragment>)
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
