import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/feedback';


const FeedbackItem = ({ feedback: { _id, user, type, title, status, text, likes, date, name, anonymous}, addLike, removeLike, showActions }) => {
    return (
        <Fragment>
            <div className="posts">
                <div className="post bg-white p-1 my-1">
                    <div>
                        {anonymous ? (<h4>{name}</h4>) : (
                            <Link to={`/profile/${user}`}>
                                <img
                                    class="round-img"
                                    src={user.avatar}
                                    alt=""
                                />
                                <h4>{name}</h4>
                            </Link>
                        )}
                    </div>
                    <div>
                        <p>
                            <b>{type}</b>
                        </p>
                        { type === "Other" && (
                            <p>
                                <b><i>{title}</i></b>
                            </p>
                        )}
                        <p className="my-1">
                            {text}
                        </p>
                        <p className="post-date">
                            Status: <i>{status}</i> | Created on <Moment format="YYYY/MM/DD">{date}</Moment>
                        </p>
                        {showActions && <Fragment>
                                <button onClick={(e) => addLike(_id)} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-up"></i>
                                {likes.length > 0 ? (<span>{likes.length}</span>) : ('')}
                            </button>
                            <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                        </Fragment>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

FeedbackItem.defaultProps = {
    showActions: true
}

FeedbackItem.propTypes = {
    feedback: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike })(FeedbackItem);