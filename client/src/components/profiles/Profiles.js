import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
    useEffect( () => {
        getAllProfiles();
    }, [getAllProfiles]);
    
    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Browse And Connect With Other Developers    
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <Fragment>
                                <p><ProfileItem key={profile._id} profile={profile} /></p>
                            </Fragment>
                        ))
                    ) : <Fragment><h4>No profiles found</h4></Fragment>}
                </div>    
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
