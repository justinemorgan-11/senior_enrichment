const express = require('express');
const path = require('path');
const { School, Student } = require('./db/index');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Define routes:

// home route: serve up index.html
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

// get all schools
app.get('/schools', (req, res, next) => {
    School.findAll()
        .then(schools => res.send(schools));
})

// get all students
app.get('/students', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students));
})

// add a new student to the database
app.post('/students', (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        schoolId: req.body.schoolId,
        imageUrl: req.body.imageUrl,
        gpa: req.body.gpa
    })
        .then(student => res.send(student))
        .catch(next);
})

// add a new school to the database
app.post('/schools', (req, res, next) => {
    School.create({
        name: req.body.name,
        address: req.body.address,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    })
        .then(school => res.send(school));
})

// remove a school
app.delete('/schools/:schoolId', (req, res, next) => {
    School.destroy({
        where: {
            id: req.params.schoolId
        }
    })
        .then(() => res.send(req.params.schoolId));
})

// remove a student
app.delete('/students/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(() => res.send(req.params.studentId));
})

// update a student
app.put('/students/edit/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.studentId);
        student.update(req.body);
        res.status(204).end();
    } catch (err) { next(err) }
})

// update a school
app.put('/schools/edit/:schoolId', async (req, res, next) => {
    try {
        const school = await School.findById(req.params.schoolId);
        school.update(req.body);
        res.status(204).end();
    } catch (err) { next(err) }
})

// sync & seed the database
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT} `));

