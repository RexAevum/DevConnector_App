import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createOrUpdateProfile, getCurrentProfile } from '../../actions/profile';

// props -> same as create profile, just also need to import prifle and loading from the profile state, and getCurrentProfile function
const EditProfile = ({ profile: {profile, loading}, createOrUpdateProfile, getCurrentProfile, history }) => {
    const initialState = {
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        handshake: ''
    };
    
    const [formData, setFormData] = useState(initialState);

    // Load user info from existing profile once the page loads
    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading && profile) {
          const profileData = { ...initialState };
          console.log(profileData)
          for (const key in profile) {
            if (key in profileData) profileData[key] = profile[key];
          }
          for (const key in profile.social) {
            if (key in profileData) profileData[key] = profile.social[key];
          }
          if (Array.isArray(profileData.skills)){
            profileData.skills = profileData.skills.join(', ');
          }
          setFormData(profileData);
        }
      }, [loading, getCurrentProfile, profile]); // will keep running till loading is false

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const { company, website, location, status, skills, bio, githubusername, youtube, twitter, facebook,
    linkedin, instagram, handshake} = formData;


    // on change function
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // create profile
        createOrUpdateProfile(formData, history, true);
    }


    return (
        <Fragment>
            <h1 className="large text-primary">
                Update Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get the newest information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >Could be your own company or one you work for</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >Could be your own or a company website</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
               <small className="form-text"
                    > - Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small
                >
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={githubusername}
                    onChange={e => onChange(e)}
                />
                <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                    username</small
                >
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                    {!displaySocialInputs ? <Fragment>Add Social Network Links</Fragment> : <Fragment>Hide Social Network Links</Fragment>}
                </button>
                <span>(Optional)</span>
                </div>

                {displaySocialInputs && (<Fragment>
                        
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fas fa-handshake fa-2x"></i>
                        <input type="text" placeholder="Handshake URL" name="handshake" value={handshake} onChange={e => onChange(e)}/>
                    </div>

                </Fragment>)}
                <input type="submit" className="btn btn-primary my-1" value="Update Profile"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createOrUpdateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createOrUpdateProfile, getCurrentProfile })(withRouter(EditProfile)); // withRouter allows the the history to be passed in, which will allows for redirects