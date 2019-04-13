
const School = require('./School');
const Student = require('./Student');
const db = require('./db');

Student.belongsTo(School);
School.hasMany(Student);

module.exports = {
    db, School, Student
}
