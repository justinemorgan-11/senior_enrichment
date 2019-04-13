
const db = require('./db');

const Student = db.define('student', {
    firstName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    imageUrl: {
        type: db.Sequelize.STRING,
        defaultValue: null
    },
    gpa: {
        type: db.Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

module.exports = Student;
