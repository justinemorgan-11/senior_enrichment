
const { Student, School, db } = require('./db/index');

const syncAndSeed = (force = true) => {
    db.sync({ force })
        .then(() => 'Database has been synced')
        .then(() => {

            const students = Promise.all([
                Student.create({ firstName: 'Harry', lastName: 'Potter', email: 'hpotter@hogwarts.co.uk', imageUrl: 'harry.png', gpa: 2.7 }),
                Student.create({ firstName: 'Draco', lastName: 'Malfoy', email: 'draco@deatheaters.co.uk', imageUrl: 'draco.png', gpa: 3.9 }),
                Student.create({ firstName: 'Hermione', lastName: 'Granger', email: 'hermione@hotmail.co.uk', imageUrl: 'hermione.png', gpa: 4.0 }),
                Student.create({ firstName: 'Cedric', lastName: 'Diggory', email: 'cdiggory@hogwarts.co.uk', imageUrl: 'cedric.png', gpa: 2.0 })
            ]);

            const schools = Promise.all([
                School.create({ name: 'Gryffindor', imageUrl: 'gryffindor.png', address: 'Behind the fat lady, Hogwarts School of Witchcraft and Wizardry', description: 'You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve, and chivalry, set Gryffindors apart' }),
                School.create({ name: 'Slytherin', imageUrl: 'slytherin.png', address: 'The Dungeon, Hogwarts School of Witchcraft and Wizardry', description: "Or perhaps in Slytherin, you'll make your real friends, those cunning folk use any means, to achieve their ends." }),
                School.create({ name: 'Ravenclaw', imageUrl: 'ravenclaw.png', address: 'something... ', description: 'something... ' }),
                School.create({ name: 'Hufflepuff', imageUrl: 'hufflepuff.png', address: 'something...', description: 'something more... ' })
            ]);

            return Promise.all([students, schools]);
        })
        .then(([students, schools]) => {

            const [harry, draco, hermione, cedric] = students;
            const [gryffindor, slytherin, ravenclaw, hufflepuff] = schools;

            harry.setSchool(gryffindor);
            gryffindor.addStudent(harry);

            draco.setSchool(slytherin);
            slytherin.addStudent(draco);

            hermione.setSchool(gryffindor);
            gryffindor.addStudent(hermione);

            cedric.setSchool(hufflepuff);
            hufflepuff.addStudent(cedric);
        })
        .then(() => console.log('Database has been seeded'))
        .catch(err => console.log(err));
}


module.exports = { syncAndSeed }

