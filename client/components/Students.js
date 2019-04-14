
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

const mapStateToProps = ({ students, schools }) => {
    return { students, schools }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete: (id) => dispatch(deleteStudent(id))
    }
}

class Students extends React.Component {

    componentDidUpdate(prevProps) {
        console.log(prevProps.students);
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div>
                <table className="student-list">
                    <tr>
                        <th />
                        <th>Student</th>
                        <th>School</th>
                        <th />
                    </tr>
                    <tbody>
                        {this.props.students.map(student => {
                            return (
                                <tr key={student.id}>
                                    <td className="img-td"><img className="img-td" src={student.imageUrl} /></td>
                                    <td className="student-td"><Link to={`/students/${student.id}`}><p>{student.firstName} {student.lastName}</p></Link></td>
                                    {student.schoolId ?
                                        <td className="student-td">
                                            <Link to={`/schools/${student.schoolId}`}>
                                                <p>
                                                    {this.props.schools.filter(s => s.id === student.schoolId)[0].name}
                                                </p>
                                            </Link>
                                        </td> :
                                        <td className="student-td"><i>Not enrolled </i></td>}
                                    <td className="student-td"><button className="btn btn-danger" type="submit" onClick={() => this.props.delete(student.id)}>X</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
