var faker = require('faker');

const createParty = () => {
  return {
    partytitle: faker.random.words() ,
    guestCount: faker.random.number(),
    date : faker.date.future(),
    theme : faker.random.words(),
    userid: 1
}
}
const createParties = (numParties = 50) => {
  return new Array(numParties)
    .fill(null)
    .map(createParty);
}

console.log(createParties());

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('parties').insert([
    {
      partytitle: "graduation",
      guestCount: "25",
      date: "Jan 25th",
      theme: "Batman",
      userid: 1
    },

     ...createParties(),
  ]);

};
