

const express = require('express');
const path = require('path');
const { syncAndSeed } = require('./syncAndSeed');
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
        .then(schools => res.send(schools))
        .catch(next);
})

// get all students
app.get('/students', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
})

// add a new student to the database
app.post('/students', (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
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
        .then(school => res.send(school))
        .catch(next);
})

// remove a school
app.delete('/schools/:schoolId', (req, res, next) => {
    School.destroy({
        where: {
            id: req.params.schoolId
        }
    })
        .catch(next)
})

// remove a student
app.delete('/students/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .catch(next);
})

// sync & seed the database
const PORT = process.env.PORT || 3000;
syncAndSeed(true);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// do i need these? don't think so... 

// app.get('/students/:studentId', (req, res, next) => {
//     Student.findOne({
//         where: {
//             id: req.params.studentId
//         }
//     })
//         .then(student => res.send(student));
// })

// app.get('/schools/:schoolId', (req, res, next) => {
//     School.findOne({
//         where: {
//             id: req.params.schoolId
//         }
//     })
//         .then(school => res.send(school));
// })
