import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// used for reducer
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { forgot, forgotPassword } from '../../actions/user';
import user from '../../reducers/auth';

const Forgot = ({ setAlert, history, forgot, forgotPassword, user: { userFound, passwordUpdated, loading }}) => {
    // formData = defines a state (const state = {{state: "fasef"}})
    // setFormData = sets the data in the state (this.state.x)
    // Define state
    const initState = {
        email: '',
        password: '',
        password2: ''
    };

    const [formData, setFormData] = useState(initState);

    // pull date from the state form
    const {email, password, password2} = formData;

    // @param   Event
    // @desc    Takes in an event and will update the formDate (object state)
    const onChange = (e) => {
        // setFormData - update the formData
        // ...formDate - copy the form, since only one field changes
        // [e.target.name] - will return the name of the object that called the event (name="x" --> x.taget.name : x.target.value)
        setFormData({ ...formData, [e.target.name] : e.target.value});
    };

    //
    const onSubmit = async(e) => {
        // prevent the submit
        e.preventDefault();
        // check if user exists
        if (!userFound){
            forgot(email);
        }

        else if (password == '' || password == ''){
            setAlert('Make sure to fill both password fields', 'danger');
        }else if (password !== password2){
            setAlert('Passwords do not match', 'danger'); // second varible responds to css
        }else if (userFound && !passwordUpdated && !loading){
            // call update profile
            forgotPassword(email, password);
            setAlert('Account Password Has Been Updated', 'success');
            history.push('/login');
        }

    };


    return (
    <Fragment>
            <h1 className="large text-primary">{user.name}</h1>
        <p className="lead"><i className="fas fa-user"></i> Forgot Your Password?</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <h4>Enter Your Account Email</h4>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email}
                    onChange={e => onChange(e)}
                    
                />
            </div>
            <p></p>
            {userFound && (
                <Fragment>
                    <h4>Password</h4>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="0"
                            value={password}
                            onChange={e => onChange(e)}
                            
                        />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="0"
                        value={password2}
                        onChange={e => onChange(e)}
                        
                    />
                    </div>
                </Fragment>
            )}

            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
        <p className="my-1">
            <Link className="btn btn" to="/">Back To Home</Link>
        </p>
    </Fragment>
    );
};


Forgot.propTypes = {
    setAlert: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    forgot: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps, { setAlert, forgot, forgotPassword })(Forgot);