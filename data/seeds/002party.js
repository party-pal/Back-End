
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('parties').insert([
    {
      party_title: "graduation",
      guestCount: "25",
      date: "Jan 25th",
      theme: "Batman",
      user_id: 1
    }

  ]);

};
