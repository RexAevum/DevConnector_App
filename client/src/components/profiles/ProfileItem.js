import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
} }) => {
    return (
        <Fragment >
            <div className="profile bg-light">
                <img src={avatar} alt=" " className="round-img"/>
                <div>
                    <h2>{name}</h2>
                    <p>{status} {company && (<span> at {company}</span>)}</p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
                </div>
                <ul>
                    {skills.slice(0, 5).map((skill, index) => (
                        <li key={index} className="text-primary">
                            <i className="fas fa-check" /> {skill}
                        </li>
                    ))}
                    {skills.length > 5 && (<li align="center"><Link to={`/profile/${_id}`} className="text-primary"><b>More...</b></Link></li>)}
                </ul>
            </div>
        </Fragment>
    )
}

export default ProfileItem;
