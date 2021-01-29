import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({ addComment, postId }) => {
    //
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addComment(postId, {text});
        setText('');
    }

    return (
        <div>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Enter Your Comment Below...</h3>
                </div>
                <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Add A Comment..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(null, { addComment })(CommentForm);
