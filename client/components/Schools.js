
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ schools, students }) => {
    return { students, schools }
}

const Schools = ({ schools }) => {
    return (
        <div>
            {schools.map(school => {
                return (
                    <div key={school.id}>
                        <img src={school.imageUrl} />
                        <h2>{school.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps)(Schools);
