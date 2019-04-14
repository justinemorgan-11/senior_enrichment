
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
    schools: [],
    students: []
}

// action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SCHOOLS = 'GET_SCHOOLS';
const NEW_SCHOOL = 'NEW_SCHOOL';
const NEW_STUDENT = 'NEW_STUDENT';
const REMOVE_SCHOOL = 'REMOVE_SCHOOL';
const REMOVE_STUDENT = 'REMOVE_STUDENT';

// action creators
const getStudents = (students) => ({ type: GET_STUDENTS, students })
const getSchools = (schools) => ({ type: GET_SCHOOLS, schools })
const newSchool = (school) => ({ type: NEW_SCHOOL, school })
const newStudent = (student) => ({ type: NEW_STUDENT, student })
const removeSchool = (id) => ({ type: REMOVE_SCHOOL, id })
const removeStudent = (student) => ({ type: REMOVE_STUDENT, student })

// reducer (TODO: come back and split into 2 reducers... is this necessary?)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHOOLS:
            return { ...state, schools: action.schools }
        case GET_STUDENTS:
            return { ...state, students: action.students }
        case NEW_SCHOOL:
            return { ...state, schools: [...state.schools, action.school] }
        case NEW_STUDENT:
            return { ...state, students: [...state.students, action.student] }
        case REMOVE_SCHOOL:
            return { ...state, schools: [...state.schools].filter(s => s.id !== action.id) }
        case REMOVE_STUDENT:
            return { ...state, students: [...state.students].filter(st => st.id !== action.student.id) }
        default:
            return state;
    }
}

// thunking...

// fetch all schools
const fetchSchools = () => {
    return (dispatch) => {
        axios.get('/schools')
            .then(res => res.data)
            .then(schools => dispatch(getSchools(schools)))
            .catch(err => console.log(err));
    }
}

// fetch all students
const fetchStudents = () => {
    return (dispatch) => {
        axios.get('/students')
            .then(res => res.data)
            .then(students => dispatch(getStudents(students)))
            .catch(err => console.log(err));
    }
}

// add a new school to the database
const addSchool = (schoolToAdd) => {
    return (dispatch) => {
        axios.post('/schools', schoolToAdd)
            .then(res => res.data)
            .then(school => dispatch(newSchool(school)))
            .catch(err => console.log(err));
    }
}

// add a new student to the database
const addStudent = (studentToAdd) => {
    return (dispatch) => {
        axios.post('/students', studentToAdd)
            .then(res => res.data)
            .then(student => dispatch(newStudent(student)))
            .catch(err => console.log(err));
    }
}

// delete a school 
const deleteSchool = (id) => {
    return (dispatch) => {
        axios.delete(`/schools/${id}`);
        axios.get('/schools')
            .then(res => res.data)
            .then(schools => dispatch(getSchools(schools)));
    }
}

// delete a student
const deleteStudent = (id) => {
    return (dispatch) => {
        axios.delete(`/students/${id}`);
        axios.get('/students')
            .then(res => res.data)
            .then(students => dispatch(getStudents(students)));
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
export { fetchSchools, fetchStudents, addSchool, addStudent, deleteSchool, deleteStudent }

