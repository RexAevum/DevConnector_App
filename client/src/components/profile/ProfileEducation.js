import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education : {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
}}) => {
    return (
        <Fragment>
            <div>
                <h3 classname="text-dark">{degree} in {fieldofstudy}</h3>
                <p>
                    <i>{school}</i>
                </p>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - { !current && to ? (<Moment format="YYYY/MM/DD">{to}</Moment>) : ('Current')}
                </p>
                <p>
                    <strong>Description: </strong>{description}
                </p>
        
            </div>
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation