
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ schools, students }, props) => {

    const school = schools.filter(s => s.id === Number(props.match.params.schoolId))[0]
    students = students.filter(student => student.schoolId === Number(props.match.params.schoolId))

    return { school, students }
}

const School = ({ school, students }) => {

    if (!school) {
        return (
            <div>
                <h1 className="not-found">School not found</h1>
            </div>
        )
    } else {
        return (
            <div className="profile">
                <div className="profile-img-container">
                    <Link to="/schools"><img className="profile-img" src={school.imageUrl} /></Link>
                </div>
                <div className="profile-details">
                    <h2>{school.name}</h2>
                    <p><b>Address: </b>{school.address}</p>
                    <p><b>About: </b>{school.description}</p>
                    <h4>Students:</h4>
                    {students.length > 0 ?
                        <ul>
                            {students.map(student => {
                                return (
                                    <Link to={`/students/${student.id}`} key={student.id}>
                                        <li >
                                            {`${student.firstName} ${student.lastName}`}
                                        </li>
                                    </Link>)
                            })}
                        </ul> :
                        <p><i>No students enrolled</i></p>
                    }
                    <div className="btn-container">
                        <Link to={`/schools/edit/${school.id}`}><button type="submit" className="btn edit-school">Edit</button></Link>
                    </div>
                </div>
            </div >
        )
    }

}

export default connect(mapStateToProps)(School);
