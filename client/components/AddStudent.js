import React from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../store';

const mapDispatchToProps = (dispatch) => {
    return {
        add: (student) => dispatch(addStudent(student))
    }
}

class AddStudent extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: 0.0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName, lastName, email, imageUrl, gpa } = this.state;
        this.props.add({ firstName, lastName, email, imageUrl, gpa });
    }


    render() {
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
                        <label className="input-label" htmlFor="imageUrl">Profile Picture <i>(Optional)</i>:</label><br />
                        <input className="input-box" name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label className="input-label" htmlFor="gpa">GPA <i>(Optional)</i>:</label><br />
                        <input className="input-box" name="gpa" value={this.state.gpa} type="number" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-secondary input-btn">Add Student</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddStudent);

