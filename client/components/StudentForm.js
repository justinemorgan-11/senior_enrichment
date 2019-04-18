import React from 'react';
import { connect } from 'react-redux';
import { addStudent, updateStudent } from '../store';
import { Redirect } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {
    return {
        add: (student) => dispatch(addStudent(student)),
        update: (student, id) => dispatch(updateStudent(student, id))
    }
}

const mapStateToProps = ({ students, schools }) => {

    return {
        students,
        schools
    }
}

class AddStudent extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            schoolId: -1,
            imageUrl: '',
            gpa: 0.0,
            submitted: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.studentId) {
            const student = this.props.students.filter(s => s.id === Number(this.props.match.params.studentId))[0];
            if (student) {
                this.setState({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    schoolId: student.schoolId,
                    imageUrl: student.imageUrl,
                    gpa: student.gpa,
                    submitted: 0
                })
            }
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        })
    }

    // eslint-disable-next-line complexity
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.firstName && this.state.lastName && this.state.email) {

            const newStudent = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                schoolId: this.state.schoolId || null,
                imageUrl: this.state.imageUrl || 'student.jpg',
                gpa: this.state.gpa
            }

            if (this.props.match.params.studentId) {
                this.props.update(newStudent, Number(this.props.match.params.studentId))
            } else {
                this.props.add(newStudent);
            }
            this.setState({ submitted: 1 });

        } else {

            const missingFields = [];

            if (!this.state.firstName) missingFields.push('first name');
            if (!this.state.lastName) missingFields.push('last name');
            if (!this.state.email) missingFields.push('email');

            // eslint-disable-next-line no-alert
            alert(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }

    render() {

        if (this.state.submitted) {
            return (
                <Redirect to="/students" />
            )
        } else {
            return (
                <div className="add-form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label className="input-label" htmlFor="firstName">First Name:</label><br />
                            <input className="input-box" name="firstName" value={this.state.firstName} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="lastName">Last Name:</label><br />
                            <input className="input-box" name="lastName" value={this.state.lastName} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="email">Email:</label><br />
                            <input className="input-box" name="email" value={this.state.email} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="school">School:</label><br />
                            <select className="input-box" name="schoolId" onChange={this.handleChange}>
                                <option>---</option>
                                {this.props.schools.map(s => {
                                    return <option key={s.id} value={s.id}>{s.name}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="input-label" htmlFor="imageUrl">Profile Picture <i>(Optional)</i>:</label><br />
                            <input className="input-box" name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="gpa">GPA <i>(Optional)</i>:</label><br />
                            <input className="input-box" name="gpa" value={this.state.gpa} type="number" onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-secondary input-btn">{this.props.match.params.studentId ? 'Update' : 'Add Student'}</button>
                    </form>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);

