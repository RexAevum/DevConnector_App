import React from 'react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    // formData = defines a state (const state = {{state: "fasef"}})
    // setFormData = sets the data in the state (this.state.x)
    // Define state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // pull date from the state form
    const {name, email, password, password2} = formData;

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
            console.log('Passwords do not match');
        }else{
            // // create a new user without redux
            // const newUser = {
            //     name: name,
            //     email: email,
            //     password: password2
            // };

            // // try to update user in db
            // try {
            //     // set up the header for the request
            //     const config = {
            //         headers: {
            //             "Content-Type" : "application/json"
            //         }
            //     };

            //     // set up the body by creating a json file
            //     const body = JSON.stringify(newUser);

            //     // make a post request to save new user to db
            //     const res = await axios.post('/api/users', body, config)
            //     console.log(res.data); // returns the server response
            // } catch (error) {
            //     console.error(error.response.data);
            // }
        }
    };


    return (
    <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required 
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email}
                    onChange={e => onChange(e)} 
                    required
                />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={e => onChange(e)}
                required
            />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
    </Fragment>
    )
}

export default Register;
