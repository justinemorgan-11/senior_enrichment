
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent, fetchStudents } from '../store';

const mapStateToProps = ({ students, schools }) => {
    return { students, schools }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete: (id) => dispatch(deleteStudent(id)),
        fetch: () => dispatch(fetchStudents())
    }
}

class Students extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.students !== prevProps.students) {
            this.props.fetch();
        }
    }

    render() {
        if (this.props.students) {
            return (
                <div>
                    <table className="student-list">
                        <tbody>
                            <tr className="student-row">
                                <th />
                                <th>Student</th>
                                <th />
                                <th>School</th>
                                <th />
                            </tr>
                            {this.props.students.map(student => {
                                return (
                                    <tr className="student-row" key={student.id}>
                                        <Link to={`/students/${student.id}`}><td className="img-td"><img className="img-td" src={student.imageUrl} /></td></Link>
                                        <td className="student-td">
                                            <Link to={`/students/${student.id}`} className="student-info"><p>{student.firstName} {student.lastName}</p></Link>
                                        </td>
                                        <td className="student-td-btn">
                                            <Link to={`/students/edit/${student.id}`}><button className="btn btn-student" type="submit">Edit</button></Link>
                                        </td>
                                        {student.schoolId ?
                                            <td className="student-td">
                                                <Link to={`/schools/${student.schoolId}`} className="student-info">
                                                    <p>
                                                        {this.props.schools.filter(s => s.id === student.schoolId)[0].name}
                                                    </p>
                                                </Link>
                                            </td> :
                                            <td className="student-td"><i>Not enrolled </i></td>}
                                        <td className="student-td-btn">
                                            <button className="btn btn-student" type="submit" onClick={() => this.props.delete(student.id)}>X</button><br />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
