import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
}}) => {
    return (
        <Fragment>
            {/*<!-- About -->*/}
            <div className="profile-about bg-light p-2">
                { bio && (
                    <Fragment>
                    <h2 class="text-primary">{name.trim().split(' ')}s' Bio</h2>
                        <p>{bio}</p>
                        <div class="line"></div>
                    </Fragment>
                )}
                <h2 className="text-primary">Skill Set</h2>
                { skills.length <= 11 ? (                    
                <div className="skills">
                    {skills.map( (skill, index) => (
                        <div key={index} className="p">
                            {  (<Fragment><i className="fas fa-check" /> {skill}</Fragment>) }
                        
                        </div>
                ))}
            </div>
            ) : (
                <div>
                    {skills.map( (skill, index) => (
                        <div key={index} className="p-01">
                            {  (<Fragment><i className="fas fa-check" /> {skill}</Fragment>) }
                        </div>
                ))}
            </div>
            )

                }

            </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
