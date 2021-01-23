// Form for adding education
import React, { Fragment, useEffect, useState } from 'react';
import {  connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
import PropTypes from 'prop-types';


const AddEducation = ({ addEducation, history }) => {
    
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '' 
    });

    // Need to make it so that either current or to is shown but not both -> create a new state that will toggeld
    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;


    const onChange = (e) => {
        // update the fields
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, history);
    }
    
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">
                    Add Your Education
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any school or bootcamps you have attended
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <h4>School</h4>
                        <input type="text" placeholder="* School" name="school" value={school} required onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <h4>Degree</h4>
                        <input type="text" placeholder="* Degree" name="degree" value={degree} required onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <h4>Field Of Study</h4>
                        <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                    </div>
                    <Fragment>
                        <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={
                            toDateDisabled ? "disabled" : ""
                        }/>
                    </div>
                    </Fragment>
                    <Fragment> 
                        <div className="form-group">
                        <p><input type="checkbox" name="current" checked={current} value={current} onChange={
                            e => {
                                setFormData({
                                    ...formData,
                                    current: !current,
                                });
                                toggleDisabled(!toDateDisabled);
                        }}/>{' '}Currently Attending</p>
                    </div>
                    </Fragment>
                    <div className="form-group">
                    <h4>Description</h4>
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={ e => onChange(e)}
                    ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" value="Add Education"/>
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </Fragment>
    )
};

AddEducation.propType = {
    addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));