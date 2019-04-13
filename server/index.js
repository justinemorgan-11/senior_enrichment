
const express = require('express');
const path = require('path');
const { syncAndSeed } = require('./syncAndSeed');
const { School, Student } = require('./db/index');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

app.get('/schools', (req, res, next) => {
    School.findAll()
        .then(schools => res.send(schools))
        .catch(next);
})

app.get('/students', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
})

const PORT = process.env.PORT || 3000;
syncAndSeed(true);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
