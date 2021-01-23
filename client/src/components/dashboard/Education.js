import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment'; // to format the date
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    // get the Educations
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree} in {edu.fieldofstudy}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '} 
                {
                    edu.to === null ? ('Current') : (<Moment format="YYYY/MM/DD" >{edu.to}</Moment>)
                }
            </td>
            <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)} >Delete</button>
        </tr>
    ));


    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead> {/* Groups the headers together */}
                    <tr> {/* Defines a row in html */}
                        <th>School</th> {/* Define a header cell */}
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th className="hide-sm">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(withRouter(Education));