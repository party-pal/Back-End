var faker = require('faker');
const db = require('../dbConfig');

const createParty = (userid) => {
  // console.log(userid)
  return {
    partytitle: faker.random.words(),
    guestCount: faker.random.number(),
    date: faker.date.future(),
    theme: faker.random.words(),
    userid,
  }
}
const createParties = (numParties = 50) => {
  return new Array(numParties)
    .fill(null)
    .map(createParty);
}

// console.log(createParties());


exports.seed = async function () {
  const users = await db("users")

  const randomUser = (min, max) => Math.round(Math.random() * (max - min) + min)
  const randomIndices = Array(users.length)
    .fill(0)
    .map(() => randomUser(1, users.length - 1))

  const parties = randomIndices.map(index => {
    return createParty(index)
  });

  return db("parties").insert(parties)
};
