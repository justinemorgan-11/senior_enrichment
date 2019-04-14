
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSchool } from '../store';

const mapStateToProps = ({ schools, students }) => {
    return { students, schools }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        delete: (id) => dispatch(deleteSchool(id))
    })
}

const Schools = (props) => {

    return (
        <div className="school-list">
            {props.schools.map(school => {
                return (
                    <div key={school.id} className="school-div">
                        <img src={school.imageUrl} className="school-logo" />
                        <Link to={`/schools/${school.id}`}><h2>{school.name}</h2></Link>
                        <button type="submit" className="btn remove-school" onClick={() => props.delete(school.id)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
