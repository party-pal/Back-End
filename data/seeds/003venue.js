
exports.seed = function(knex) {
       return knex('table_name').insert([
        {
          venue_title: "Bar",
          cost: "1,000,000,000",
          location: "Bar",
          party_id: 1
          }
          
      ]);
    
};
