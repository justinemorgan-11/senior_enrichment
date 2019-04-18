import React from 'react';
import { connect } from 'react-redux';
import { addSchool, updateSchool } from '../store';
import Schools from './Schools';

const mapDispatchToProps = (dispatch) => {
    return {
        add: (school) => dispatch(addSchool(school)),
        update: (school, id) => dispatch(updateSchool(school, id))
    }
}

const mapStateToProps = ({ schools }) => {
    return ({
        schools
    })
}

class AddSchool extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            imageUrl: '',
            description: '',
            submitted: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.schoolId) {
            const school = this.props.schools.filter(s => s.id === Number(this.props.match.params.schoolId))[0];
            if (school) {
                this.setState({
                    name: school.name,
                    address: school.address,
                    imageUrl: school.imageUrl,
                    description: school.description,
                    submitted: 0
                })
            }
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        }, () => console.log(this.state))
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.name && this.state.address) {

            const newSchool = {
                name: this.state.name,
                address: this.state.address,
                imageUrl: this.state.imageUrl || 'building.png',
                description: this.state.description || null
            }

            if (this.props.match.params.schoolId) {
                this.props.update(newSchool, Number(this.props.match.params.schoolId));
            } else {
                this.props.add(newSchool);
            }
            this.setState({ submitted: 1 })

        } else {

            const missingFields = [];
            if (!this.state.name) missingFields.push('school name');
            if (!this.state.address) missingFields.push('address');

            // eslint-disable-next-line no-alert
            alert(`Missing required fields: ${missingFields.join(', ')}`);

        }
    }

    render() {
        if (this.state.submitted) {
            return (
                <Schools />
            )
        } else {
            return (
                <div className="add-form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label className="input-label" htmlFor="name">Name:</label><br />
                            <input className="input-box" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="address">Address:</label><br />
                            <input className="input-box" name="address" type="text" value={this.state.address} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="imageUrl">Image URL <i>(Optional)</i></label><br />
                            <input className="input-box" name="imageUrl" type="text" value={this.state.imageUrl} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="input-label" htmlFor="description">Description <i>(Optional)</i></label><br />
                            <input className="input-box" name="description" type="text" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-secondary input-btn">{this.props.match.params.schoolId ? 'Update' : 'Add School'}</button>
                    </form>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSchool);
