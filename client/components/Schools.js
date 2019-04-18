
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSchool, fetchSchools } from '../store';

const mapStateToProps = ({ schools, students }) => {
    return { students, schools }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        delete: (id) => dispatch(deleteSchool(id)),
        fetch: () => dispatch(fetchSchools())
    })
}

class Schools extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.schools !== this.props.schools) {
            this.props.fetch();
        }
    }

    render() {
        return (
            <div className="school-list">
                {this.props.schools.map(school => {
                    return (
                        <div key={school.id} className="school-div">
                            <div className="btn-container">
                                <button className="btn remove-btn" type="submit" onClick={() => this.props.delete(school.id)}>X</button>
                            </div>
                            <Link to={`/schools/${school.id}`}><img src={school.imageUrl} className="school-logo" /><br /></Link>
                            <h4 className="school-name">{school.name}</h4>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
