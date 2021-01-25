import PropTypes from 'prop-types';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileTop = ({ profile: {
    status,
    company,
    website,
    location,
    social,
    user: { name, avatar }
}}) => {
    // if no social media accounts are added, return empty string
    if (typeof(social) == 'undefined') {
        social = {
            youtube: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            handshake: ''
        }
    }

    return (
        <Fragment>
            {/*<!-- Top --> */}
            <div class="profile-top bg-primary p-2">
                <img
                    class="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 class="large">{name}</h1>
                <p class="lead">{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div class="icons my-1">
                    { website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )}
                    { social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter fa-2x"></i>
                        </a>
                    )}
                    { social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-facebook fa-2x"></i>
                        </a>
                    )}
                    { social.linkedIn && (
                        <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin fa-2x"></i>
                        </a>
                    )}
    
                    { social.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube fa-2x"></i>
                        </a>
                    )}
                    { social.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-instagram fa-2x"></i>
                        </a>
                    )}

                    { social.handshake && (
                        <a href={social.handshake} target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-handshake fa-2x"></i>
                        </a>
                    )}

                </div>
            </div>
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};



export default connect()(ProfileTop);
