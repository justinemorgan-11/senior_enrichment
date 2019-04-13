
const { Student, School, db } = require('./db/index');

const syncAndSeed = (force = true) => {
    db.sync({ force })
        .then(() => 'Database has been synced')
        .then(() => {

            const students = Promise.all([
                Student.create({ firstName: 'Harry', lastName: 'Potter', email: 'hpotter@hogwarts.co.uk', imageUrl: 'https://cdn.shopify.com/s/files/1/0193/6253/products/1050252549_600x.png?v=1549679497', gpa: 2.7 }),
                Student.create({ firstName: 'Draco', lastName: 'Malfoy', email: 'draco@deatheaters.co.uk', imageUrl: 'https://i.pinimg.com/236x/d9/25/2a/d9252a345780864efb4d2809857fc676--harry-potter-toms-harry-potter-things.jpg', gpa: 3.9 }),
                Student.create({ firstName: 'Hermione', lastName: 'Granger', email: 'hermione@hotmail.co.uk', imageUrl: 'https://pbs.twimg.com/profile_images/527201530102161408/M_Uv2Xjr.jpeg', gpa: 4.0 }),
                Student.create({ firstName: 'Cedric', lastName: 'Diggory', email: 'cdiggory@hogwarts.co.uk', imageUrl: 'http://www.femalefirst.co.uk/image-library/square/500/r/robert-pattinson---wi08-12.jpg', gpa: 2.0 })
            ]);

            const schools = Promise.all([
                School.create({ name: 'Dubai College', imageUrl: 'dubaicollege.jpg', address: 'Hessa Street, Dubai, UAE', description: 'Dubai College is a secondary school in Dubai, United Arab Emirates. Established in 1978, the school caters for students in Years 7 to 13, and is situated in the Al Sufouh area of the city.' }),
                School.create({ name: 'The English College', imageUrl: 'englishcollege.jpg', address: 'Opposite Oasis Mall, Dubai, UAE', description: 'The English College, Dubai is an independent school in Dubai following the British curriculum from FS1 to Year 13. It is located in the Al Safa 1 residential area, adjacent to Sheikh Zayed Road, opposite Oasis Mall.' }),
                School.create({ name: 'Jumeirah College', imageUrl: 'jumeirahcollege.jpeg', address: '19th Street, Dubai, UAE', description: 'Jumeirah College is a GEMS international school in the Jumeirah area of Dubai in the United Arab Emirates, offering the Curriculum for England and Wales. It was established in 1999.' }),
                School.create({ name: 'Dubai English Speaking College', imageUrl: 'desc.jpg', address: 'Academic City Road, Dubai, UAE', description: 'Dubai English Speaking College is a British private school located in the Academic City, Dubai, UAE. It follows the National Curriculum for England' }),
                School.create({ name: 'Jebel Ali School', imageUrl: 'jas.jpg', address: 'AKOYA Development, Remraam Desert Road, Mudon, Dubai, UAE', description: 'Jebel Ali School. A leading non profit Dubai British curriculum primary and secondary school since 1977.' }),
                School.create({ name: 'GEMS Wellington International School', imageUrl: 'wellington.png', address: 'Al Sufouh 1, Dubai, UAE', description: 'GEMS Wellington International School is a private school situated in the Al Sufouh area of Dubai in the United Arab Emirates. The school is situated in Al Sufouh and has over 2800 students enrolled.' })
            ]);

            return Promise.all([students, schools]);
        })
        .then(([students, schools]) => {

            const [harry, draco, hermione, cedric] = students;
            const [gryffindor, slytherin, ravenclaw, hufflepuff] = schools;

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

