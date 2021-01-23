import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment'; // to format the date
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
    // get the experiences
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '} 
                {
                    exp.to === null ? ('Current') : (<Moment format="YYYY/MM/DD" >{exp.to}</Moment>)
                }
            </td>
            <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
        </tr>
    ));


    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead> {/* Groups the headers together */}
                    <tr> {/* Defines a row in html */}
                        <th>Company</th> {/* Define a header cell */}
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Duration</th>
                        <th className="hide-sm">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(withRouter(Experience));
