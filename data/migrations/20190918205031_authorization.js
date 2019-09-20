
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('firstname', 255)
            .notNullable();
        users
            .string('lastname', 255)
            .notNullable();
        users
            .string('emailaddress', 255)
            .unique()
            .notNullable();
        users.string('password', 255)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
