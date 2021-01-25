import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect( () => {
        getProfileById(match.params.id); // to get a variable from the url using react props.match.params.{placeholder name}

    }, [getProfileById, match.params.id]);
    
    return (
        <Fragment>
            {profile === null || loading ? (<Spinner />) : (
                <Fragment>
                    <p>{profile.user.name}'s Profile</p>
                    <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
                    {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-primary">Edit My Profile</Link>
                    )}
                </Fragment>
            )}

            { profile !== null && (
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile} />
                </div>
            )}

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

export default connect(mapStateToProps, { getProfileById })(Profile);
