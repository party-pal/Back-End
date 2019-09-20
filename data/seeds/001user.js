
exports.seed = function(knex) {
       // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'Shaun',
          lastname: 'Kolich',
          emailaddress:'test@gmail.com',
          password:'test'
          }
      ]);
   
};
