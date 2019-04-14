
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
                        <div className="btn-container">
                            <button type="submit" className="btn remove-school" onClick={() => props.delete(school.id)}>X</button>
                        </div>
                        <h6>{school.name}</h6><br />
                        <Link to={`/schools/${school.id}`}><img src={school.imageUrl} className="school-logo" /><br /></Link>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
