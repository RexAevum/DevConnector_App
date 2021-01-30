import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


export const Navbar = ({ auth: { isAuthenticated, loading, user}, logout}) => {
    // for a logged in user
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    <i className="fas fa-users" />{' '}
                    <span className="hide-sm">Developers</span>
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    <i className="fas fa-comments" />{' '}
                    <span className="hide-sm">Posts</span>
                </Link>
            </li>
                {!loading && user !== null && (
                <li>
                    <Link to={`/profile/${user._id}`}>
                        <i className="fas fa-id-badge" />{' '}
                        <span className="hide-sm">My Profile</span>
                    </Link>
                </li>
                )}
            <li>
                <Link to='/dashboard'>
                    <i className="fas fa-user-cog"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/" onClick={logout} >
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );
    // for new users / not logged in users
    const guestLinks = (
        <ul>
            <li>
            <Link to='/profiles'>
                    <i className="fas fa-users" />{' '}
                    <span>Developers</span>
            </Link>
            </li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );




    return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to='/'>
                        <i className="fas fa-code"></i> DevConnector
                    </Link>
                </h1>
                { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
            </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
