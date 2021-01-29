import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';


const CommentItem = ({ comment: { _id, text, name, avatar, user, date}, postId, auth, deleteComment }) => {

    return (
        <Fragment>
            <div class="comments">
                <div class="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/${user}`}>
                        <img
                            class="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p class="my-1">
                            {text}
                        </p>
                        <p class="post-date">
                            <Moment format="YYYY/MM/DD">{date}</Moment>
                        </p>
                        <div>
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={() => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);
