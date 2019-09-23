
exports.seed = function(knex) {
       return knex('venues').insert([
        {
          venuetitle: "Bar",
          cost: "1,000,000,000",
          location: "Bar",
          partyid: 1
          }
          
      ]);
    
};
