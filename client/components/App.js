import React from 'react';
import Schools from './Schools';
import Students from './Students';
import School from './School';
import Student from './Student';
import SchoolForm from './SchoolForm';
import StudentForm from './StudentForm';
import Nav from './Nav';
import NotFound from './NotFound';
import { HashRouter as Router, Route } from 'react-router-dom';
import { fetchStudents, fetchSchools } from '../store';
import { connect } from 'react-redux';
import { Switch } from 'react-router';

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
                <div className="background">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Schools} />
                        <Route exact path="/schools/:schoolId" component={School} />
                        <Route exact path="/add/schools" component={SchoolForm} />
                        <Route exact path="/schools" component={Schools} />
                        <Route exact path="/students/:studentId" component={Student} />
                        <Route exact path="/add/students" component={StudentForm} />
                        <Route exact path="/students" component={Students} />
                        <Route path="/students/edit/:studentId" component={StudentForm} />
                        <Route path="/schools/edit/:schoolId" component={SchoolForm} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

