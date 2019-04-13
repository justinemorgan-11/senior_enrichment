
const db = require('./db');

const School = db.define('school', {
    name: {
        type: db.Sequelize.STRING
    },
    imageUrl: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.TEXT
    }
})

module.exports = School;    
