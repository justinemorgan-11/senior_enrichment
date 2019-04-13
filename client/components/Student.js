import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ students, schools }, props) => {
    const student = students.filter(st => st.id === Number(props.match.params.studentId))[0];
    const school = student ? schools.filter(s => s.id === student.schoolId)[0] : null;
    return ({ student, school });
}

const Student = ({ school, student }) => {
    if (!student) {
        return <div />
    } else {
        return (
            <div>
                <h2>{student.firstName} {student.lastName}</h2>
                <img src={student.imageUrl} className="student-picture" />
                <p><b>Email: </b>{student.email}</p>
                <p><b>School: </b>{school ? <Link to={`/schools/${school.id}`}>{school.name}</Link> : <i>This student is not currently enrolled in school</i>}</p>
                <p><b>GPA: </b>{student.gpa}</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Student);