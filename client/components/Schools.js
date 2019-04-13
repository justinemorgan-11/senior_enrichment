
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ schools, students }) => {
    return { students, schools }
}

const Schools = ({ schools }) => {
    return (
        <div className="school-list">
            {schools.map(school => {
                return (
                    <div key={school.id} className="school-div">
                        <img src={school.imageUrl} className="school-logo" />
                        <Link to={`/schools/${school.id}`}><h2>{school.name}</h2></Link>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps)(Schools);
