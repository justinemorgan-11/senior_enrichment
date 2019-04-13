
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

// action creators
const getStudents = (students) => ({ type: GET_STUDENTS, students })
const getSchools = (schools) => ({ type: GET_SCHOOLS, schools })
const newSchool = (school) => ({ type: NEW_SCHOOL, school })
const newStudent = (student) => ({ type: NEW_STUDENT, student })

// reducers
// const studentReducer = (state = [], action) => {

//     switch (action.type) {
//         case GET_STUDENTS:
//             return action.students
//         default:
//             return state;
//     }
// }

// const schoolReducer = (state = [], action) => {

//     switch (action.type) {
//         case GET_SCHOOLS:
//             return action.schools
//         default:
//             return state;
//     }
// }

// const reducer = combineReducers({
//     studentReducer,
//     schoolReducer
// })

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

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
export { fetchSchools, fetchStudents, addSchool, addStudent }

