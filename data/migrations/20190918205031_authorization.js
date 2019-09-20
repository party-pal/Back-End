
exports.up = function (knex) {
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
        .createTable('parties', tbl => {
            tbl.increments();
            tbl
                .string('party_title', 255)
                .notNullable();
            tbl
                .string('guestCount', 255)
                .notNullable();
            tbl
                .string('date', 255)
                .notNullable();
            tbl
                .string('theme', 255)
                .notNullable();
            tbl.integer('user_Id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
            })
        .createTable('venues', tbl => {
            tbl.increments();
            tbl
                .string('venue_title', 255)
            tbl
                .string('cost', 255)
            tbl
                .string('location', 255)
            tbl.integer('party_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('parties')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');


        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users')
        .then(()=>{
            knex.schema.dropTableIfExists('parties')
                .then(() => {
                    knex.schema.dropTableIfExists('venues')   
                })
        })
};
