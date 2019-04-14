
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
        return <div />
    } else {
        return (
            <div className="profile">
                <h1>{school.name}</h1>
                <p>{school.address}</p>
                <img src={school.imageUrl} />
                <p>{school.description}</p>
                <h3>Students:</h3>
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
            </div>
        )
    }

}

export default connect(mapStateToProps)(School);
