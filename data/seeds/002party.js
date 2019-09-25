var faker = require('faker');
const db = require('../dbConfig')

const createParty = (userid) => {
  // console.log(userid)
  return {
    partytitle: faker.random.words(),
    guestCount: faker.random.number(),
    date: faker.date.future(),
    theme: faker.random.words(),
    userid:userid
  }
}
const createParties = (numParties = 50) => {
  return new Array(numParties)
    .fill(null)
    .map(createParty);
}

// console.log(createParties());


exports.seed = function () {
  // Inserts seed entries
  return db('users')
    .then(users => {
      const randomUser = (min, max) => Math.round(Math.random() * (max - min) + min)
      const randomIndices = Array(users.length)                     .fill(0)
                .map(() => randomUser(1, users.length-1))
        
      
      
      const parties = randomIndices.map((index => {
        return createParty(1)
      }))
      
      return parties

    
    }).then((parties) => {
      console.log(parties);
      db('parties').insert(parties);
    })
};
