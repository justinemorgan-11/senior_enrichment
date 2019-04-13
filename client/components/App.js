import React from 'react';
import Schools from './Schools';
import Students from './Students';
import School from './School';
import Student from './Student';
import Nav from './Nav';
import { HashRouter as Router, Route } from 'react-router-dom';
import { fetchStudents, fetchSchools } from '../store';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {

    return ({
        loadStudents: () => dispatch(fetchStudents()),
        loadSchools: () => dispatch(fetchSchools())
    })
}

const mapStateToProps = ({ schools, students }) => {
    return ({
        students,
        schools
    })
}

class App extends React.Component {

    componentDidMount() {
        this.props.loadSchools();
        this.props.loadStudents();
    }

    render() {
        return (
            <Router>
                <div>
                    <h1>Dubai Schools</h1>
                    <Nav />
                    <Route path="/schools/:schoolId" component={School} />
                    <Route exact path="/schools" component={Schools} />
                    <Route path="/students/:studentId" component={Student} />
                    <Route exact path="/students" component={Students} />
                </div>
            </Router>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

