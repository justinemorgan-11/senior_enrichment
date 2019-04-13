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
        }, () => console.log(this.state))
    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName, lastName, email, imageUrl, gpa } = this.state;
        this.props.add({ firstName, lastName, email, imageUrl, gpa });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label><br />
                        <input name="firstName" value={this.state.firstName} type="text" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label><br />
                        <input name="lastName" value={this.state.lastName} type="text" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label><br />
                        <input name="email" value={this.state.email} type="text" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Profile Picture <i>(Optional)</i>:</label><br />
                        <input name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="gpa">GPA <i>(Optional)</i>:</label><br />
                        <input name="gpa" value={this.state.gpa} type="number" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Add Student</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddStudent);

