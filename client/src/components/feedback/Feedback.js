import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFeedbacks } from '../../actions/feedback';
import Spinner from '../layout/Spinner';
import FeedbackItem from './FeedbackItem';
import FeedbackForm from './FeedbackForm';

const Feedback = ({ getFeedbacks, feedback: { feedbacks, loading }}) => {
    //
    useEffect(() => {
        getFeedbacks();

    }, [getFeedbacks])

    return (
        <Fragment>
        {loading ? <Spinner /> : (
            <Fragment>
            <h1 className="large text-primary">User Feedback</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Please Provide Feedback About Your Experience
            </p>
            {/* Feedback Form */}
            <FeedbackForm />
            <div className="bg-primary p">
                    <h3 align="center">See What Others Have To Say About The Site</h3>
                </div>
            <div className="feedbacks">
                {feedbacks.map(feedback => (
                    <FeedbackItem key={feedback._id} feedback={feedback} />
                ))}
            </div>
            </Fragment>
        )}
        </Fragment>

    )
}

Feedback.propTypes = {
    getFeedbacks: PropTypes.func.isRequired,
    feedback: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    feedback: state.feedback
})

export default connect(mapStateToProps, { getFeedbacks })(Feedback);