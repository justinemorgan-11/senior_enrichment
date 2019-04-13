
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ students }) => {
    return { students }
}

const Students = ({ students }) => {
    return (
        <div>
            {students.map(student => {
                return (
                    <div key={student.id}>
                        <h2>{student.firstName} {student.lastName}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps)(Students);
