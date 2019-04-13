
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ students }) => {
    return { students }
}

const Students = ({ students }) => {
    return (
        <div>
            {students.map(student => {
                return (
                    <div key={student.id}>
                        <Link to={`/students/${student.id}`}><h2>{student.firstName} {student.lastName}</h2></Link>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps)(Students);
