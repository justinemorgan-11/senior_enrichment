
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

// action creators
const getStudents = (students) => ({ type: GET_STUDENTS, students })
const getSchools = (schools) => ({ type: GET_SCHOOLS, schools })

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
        default:
            return state;
    }
}

// thunking...
const fetchSchools = () => {
    return (dispatch) => {
        axios.get('/schools')
            .then(res => res.data)
            .then(schools => dispatch(getSchools(schools)))
    }
}

const fetchStudents = () => {
    return (dispatch) => {
        axios.get('/students')
            .then(res => res.data)
            .then(students => dispatch(getStudents(students)));
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
export { fetchSchools, fetchStudents }

