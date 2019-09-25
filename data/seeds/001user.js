const bycrypt = require('bcryptjs');
var faker = require('faker');
const db = require('../dbConfig');


exports.seed = async function(knex) {
       // Inserts seed entries
  const hash = await bycrypt.hash('test', 10);
  // const randomFirst = faker.name.firstName(); 
  // const randomLast = faker.name.lastName();
  // const randomEmail = faker.internet.email();
  // const randomPass = faker.internet.password();

  const createUser = () => {
    return {
      firstname : faker.name.firstName() ,
      lastname: faker.name.lastName(),
      emailaddress : faker.internet.email(),
      password : hash,

  }
  }
  const createUsers = (numUsers = 50) => {
    return new Array(numUsers)
      .fill(null)
      .map(createUser);
  }
  
  
  // console.log(createUsers());

      return db('users').insert([
        {
          firstname: 'Shaun',
          lastname: 'Kolich',
          emailaddress:'testgmail.com',
          password: hash
        },
        
        ...createUsers(),
        
        
      ]);
   
};
