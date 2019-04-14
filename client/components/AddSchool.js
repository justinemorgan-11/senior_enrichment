
import React from 'react';
import { connect } from 'react-redux';
import { addSchool } from '../store';

const mapDispatchToProps = (dispatch) => {
    return {
        add: (school) => dispatch(addSchool(school))
    }
}

class AddSchool extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            imageUrl: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        }, () => console.log(this.state))
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, address, imageUrl, description } = this.state;
        this.props.add({ name, address, imageUrl, description });
    }

    render() {
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
                    <button type="submit" className="btn btn-secondary input-btn">Add School</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddSchool);
