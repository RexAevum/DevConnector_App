import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFeedback } from '../../actions/feedback';
import { useState } from 'react';

const FeedbackForm = ({ addFeedback, auth: { user } }) => {
    const initialState = {
        name: '',
        type: '',
        title: '',
        text: '',
        status: 'New',
        anonymous: false,
    };
    // create a form for feedback state 
    const [formData, setFormData] = useState(initialState);
    // pull out needed variables 
    const { title, type, text, anonymous } = formData;
    // enable checkbox functionality using form
    const [showAuthorName, toggleName] = useState(anonymous);

    const onSubmit = e => {
        e.preventDefault();
        // check if user want's to display their name on the feedback post
        setFormData({
            ...formData,
            name: !anonymous ? user.name : "Anonymous"
        });
        addFeedback(formData);
        // clear form
        setFormData(initialState);
        toggleName(false);
    }

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return (
        <Fragment>
            <div className="feedback-form">
                <div className="bg-primary p">
                    <h3 align="center">Add Your Feedback</h3>
                </div>
                <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                    <h4>*Feedback Type</h4>
                    <select className="" name="type" value={type} onChange={e => onChange(e)}>
                        <option value="0">* Select Feedback Type</option>
                        <option value="Report Issue">Report Issue</option>
                        <option value="Suggestions">Suggestions</option>
                        <option value="Account Issues">Account Issues</option>
                        <option value="Positive Feedback">Positive Feedback</option>
                        <option value="Constructive Feedback">Constructive Feedback</option>
                        <option value="Other">Other</option>
                    </select>
                    {type === 'Other' && (
                        <p className="mtop-1">
                            <input type="text" name="title" value={title} placeholder="Enter Custom Feedback Title" onChange={e => onChange(e)} />
                        </p>
                    )}
                    <h4 className="mtop-1">*Feedback</h4>
                    <textarea
                        className="p-1"
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="* Share Your Feedback"
                        value={text}
                        onChange={e => onChange(e)}
                        required
                    ></textarea>
                    <p><b>Hide Name:</b> <input type="checkbox" name="showAuthorName" checked={showAuthorName} value={anonymous} onChange={
                            e => {
                                setFormData({
                                    ...formData,
                                    anonymous: !anonymous,
                                });
                                toggleName(!showAuthorName);
                        }}/>
                    </p>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </Fragment>
    )
}

FeedbackForm.propTypes = {
    addFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addFeedback })(FeedbackForm);