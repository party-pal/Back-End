const db = require('../dbConfig');

exports.seed = function() {
       return db('venues').insert([
        {
          venuetitle: "Bar",
          cost: "1,000,000,000",
          location: "Bar",
          partyid: 52
         },
         {
          venuetitle: "Bar",
          cost: "1,000,000,000",
          location: "Bar",
          partyid: 53
         },
         {
          venuetitle: "Bar",
          cost: "1,000,000,000",
          location: "Bar",
          partyid: 54
          },
          {
            venuetitle: "Bar",
            cost: "1,000,000,000",
            location: "Bar",
            partyid: 55
            }
          
      ]);
    
};
