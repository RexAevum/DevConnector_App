import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience : {
    company,
    title,
    location,
    current,
    to,
    from,
    description
}}) => {
    return (
        <Fragment>
            <div>
                <h3 classname="text-dark">{company}</h3>
                <p>
                    <i>{location}</i>
                </p>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - { !current && to ? (<Moment format="YYYY/MM/DD">{to}</Moment>) : ('Current')}
                </p>
                <p>
                    <strong>Position: </strong>{title}
                </p>
                <p>
                    <strong>Description: </strong>{description}
                </p>
            </div>
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
