
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
                School.create({ name: 'Dubai College', imageUrl: 'dubaicollege.jpg', address: 'Hessa Street, Dubai, UAE', description: 'Dubai College is a secondary school in Dubai, United Arab Emirates. Established in 1978, the school caters for students in Years 7 to 13, and is situated in the Al Sufouh area of the city.' }),
                School.create({ name: 'The English College', imageUrl: 'englishcollege.jpg', address: 'Opposite Oasis Mall, Dubai, UAE', description: 'The English College, Dubai is an independent school in Dubai following the British curriculum from FS1 to Year 13. It is located in the Al Safa 1 residential area, adjacent to Sheikh Zayed Road, opposite Oasis Mall.' }),
                School.create({ name: 'Jumeirah College', imageUrl: 'jumeirahcollege.jpeg', address: '19th Street, Dubai, UAE', description: 'Jumeirah College is a GEMS international school in the Jumeirah area of Dubai in the United Arab Emirates, offering the Curriculum for England and Wales. It was established in 1999.' }),
                School.create({ name: 'Dubai English Speaking College', imageUrl: 'desc.jpg', address: 'Academic City Road, Dubai, UAE', description: 'Dubai English Speaking College is a British private school located in the Academic City, Dubai, UAE. It follows the National Curriculum for England' })
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

