import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// used for reducer
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../../actions/user';
import auth from '../../reducers/auth';

const UserForm = ({ setAlert, history, updateUser, auth: { user, loading }}) => {
    // formData = defines a state (const state = {{state: "fasef"}})
    // setFormData = sets the data in the state (this.state.x)
    // Define state
    const initState = {
        name: '',
        email: '',
        newemail: '',
        password: '',
        password2: ''
    };

    const [formData, setFormData] = useState(initState);

    //pull in current state
    useEffect(() => {
        if (!loading && user){
            const userData = { ...initState };
            for (const key in user){
                if (key in userData) userData[key] = user[key];
            }
            setFormData(userData);
        }else{
            setAlert('No user data found, try loging out and logging back in', 'danger');

        }
    }, [user, loading])

    // pull date from the state form
    const {name, email, newemail, password, password2} = formData;

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
        // check if passwords match
        if (password !== password2){
            setAlert('Passwords do not match', 'danger'); // second varible responds to css
        }else{
            // call update profile
            updateUser(formData, history);
        }

    };


    return (
    <Fragment>
            <h1 className="large text-primary">{user.name}</h1>
        <p className="lead"><i className="fas fa-user"></i> Update Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                     
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email}
                    onChange={e => onChange(e)}
                    disabled="true" 
                    
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="New Email Address" 
                    name="newemail" 
                    value={newemail}
                    onChange={e => onChange(e)} 
                    
                />
                <small className="form-text"
                    >This site uses Gravatar, so if you want a profile image, use a
                    Gravatar email</small
                >
            </div>
            <p></p>
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
            <input type="submit" className="btn btn-primary" value="Update" />
        </form>
        <p className="my-1">
            <Link className="btn btn" to="/dashboard">Back To Dashboard</Link>
        </p>
    </Fragment>
    );
};


UserForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { setAlert, updateUser })(UserForm);