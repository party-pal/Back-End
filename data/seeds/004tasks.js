const db = require('../dbConfig');

exports.seed = function () {
  // Deletes ALL existing entries

  return db('task').insert([
    {
      purchase: "beer",
      purchase_cost: 500,
      entertainment: "Band",
      entertainment_cost: 1000,
      venueid: 1
    }
  ]);

};
