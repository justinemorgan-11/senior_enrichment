
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
const NEW_STUDENT = 'NEW_STUDENT';
const NEW_SCHOOL = 'NEW_SCHOOL';

// action creators
const getStudents = (students) => ({ type: GET_STUDENTS, students });
const getSchools = (schools) => ({ type: GET_SCHOOLS, schools });
const newStudent = (student) => ({ type: NEW_STUDENT, student });
const newSchool = (school) => ({ type: NEW_SCHOOL, school });

// reducer (TODO: come back and split into 2 reducers... is this necessary?)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHOOLS:
            return { ...state, schools: action.schools }
        case GET_STUDENTS:
            return { ...state, students: action.students }
        case NEW_STUDENT:
            return { ...state, students: [...state.students, action.student] }
        case NEW_SCHOOL:
            return { ...state, schools: [...state.schools, action.school] }
        default:
            return state;
    }
}

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
        return axios.post('/schools', schoolToAdd)
            .then(res => res.data)
            .then(s => dispatch(newSchool(s)));
    }
}

// add a new student to the database
const addStudent = (studentToAdd) => {
    return (dispatch) => {
        return axios.post('/students', studentToAdd)
            .then(res => res.data)
            .then(s => dispatch(newStudent(s)))
    }
}

// delete a school 
const deleteSchool = (id) => {
    return (dispatch) => {
        return axios.delete(`/schools/${id}`)
            .then(() => dispatch(fetchSchools()));
    }
}

// delete a student
const deleteStudent = (id) => {
    return (dispatch) => {
        return axios.delete(`/students/${id}`)
            .then(() => dispatch(fetchStudents()));
    }
}

// update a student
const updateStudent = (student, id) => {
    console.log(id);
    return (dispatch) => {
        return axios.put(`/students/edit/${id}`, student)
            .then(() => dispatch(fetchStudents()));

    }
}

// update a school
const updateSchool = (school, id) => {
    return (dispatch) => {
        return axios.put(`/schools/edit/${id}`, school)
            .then(() => dispatch(fetchSchools()));

    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
export { fetchSchools, fetchStudents, addSchool, addStudent, deleteSchool, deleteStudent, updateStudent, updateSchool }

